import { useEffect, useRef, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { LINKS, SOURCES } from "../data/links.js";

const HOUR = 3600 * 1000;
const DAY = 24 * HOUR;

function weightedPick(items) {
  const total = items.reduce((s, i) => s + i.weight, 0);
  let r = Math.random() * total;
  for (const it of items) {
    r -= it.weight;
    if (r <= 0) return it;
  }
  return items[items.length - 1];
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

// Returns { interval(ms), clicksThisTick } based on elapsed time since start
function tickPlan(elapsed) {
  const days = elapsed / DAY;
  const hrs = elapsed / HOUR;
  let interval = 9000;
  let table; // cumulative probability -> number of clicks

  if (hrs < 0.5) table = [[0.92, 0], [1.0, 1]];
  else if (hrs < 2) table = [[0.8, 0], [0.98, 1], [1.0, 2]];
  else if (hrs < 6) table = [[0.65, 0], [0.9, 1], [0.99, 2], [1.0, 3]];
  else if (hrs < 12) table = [[0.5, 0], [0.82, 1], [0.96, 2], [1.0, 3]];
  else if (hrs < 24) table = [[0.4, 0], [0.75, 1], [0.93, 2], [0.99, 3], [1.0, 4]];
  else table = [[0.38, 0], [0.72, 1], [0.9, 2], [0.98, 3], [1.0, 4]];

  if (days < 1) interval = 9000;
  else if (days < 2) interval = 8000;
  else if (days < 3) interval = 7000;
  else if (days < 7) interval = 6000;
  else if (days < 14) interval = 5000;
  else interval = 4500;

  const r = Math.random();
  let clicks = 0;
  for (const [cum, n] of table) {
    if (r <= cum) {
      clicks = n;
      break;
    }
  }
  // occasional bursts after day 4
  if (days >= 4 && Math.random() < 0.05) clicks += Math.floor(rand(2, 5));
  return { interval, clicks };
}

function conversionRate(elapsed) {
  const days = elapsed / DAY;
  if (days < 1) return 0;
  if (days < 2) return 0.005;
  if (days < 3) return 0.01;
  if (days < 7) return rand(0.015, 0.025);
  if (days < 14) return rand(0.025, 0.04);
  return rand(0.03, 0.05);
}

function earnFor(link) {
  // 5% big conversion
  if (Math.random() < 0.05) return rand(5, 12);
  return rand(link.earnMin, link.earnMax);
}

function freshState() {
  const perLink = {};
  LINKS.forEach((l) => (perLink[l.key] = { clicks: 0, conversions: 0, earnings: 0 }));
  return {
    startedAt: Date.now(),
    totalClicks: 0,
    totalConversions: 0,
    totalEarnings: 0,
    perLink,
    activity: [], // {t, key, name, source, type, amount}
    daily: {}, // dateStr -> clicks
    clickToastCounter: 0,
  };
}

export function useSimulation(userId) {
  const storeKey = "linkvault_sim_" + userId;
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);

  // load / init + 1.5s skeleton
  useEffect(() => {
    if (!userId) return;
    let s;
    try {
      s = JSON.parse(localStorage.getItem(storeKey) || "null");
    } catch {
      s = null;
    }
    if (!s) {
      s = freshState();
      localStorage.setItem(storeKey, JSON.stringify(s));
    }
    ref.current = s;
    setState(s);
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, [userId]);

  const commit = useCallback(() => {
    const s = ref.current;
    localStorage.setItem(storeKey, JSON.stringify(s));
    setState({ ...s });
  }, [storeKey]);

  useEffect(() => {
    if (!userId || !ref.current) return;
    let timer;

    function schedule() {
      const s = ref.current;
      const elapsed = Date.now() - s.startedAt;
      const { interval, clicks } = tickPlan(elapsed);
      timer = setTimeout(() => {
        runTick(clicks, elapsed);
        schedule();
      }, interval);
    }

    function runTick(clicks, elapsed) {
      if (clicks <= 0) return;
      const s = ref.current;
      const today = new Date().toISOString().slice(0, 10);
      let convHappened = false;

      for (let i = 0; i < clicks; i++) {
        const link = weightedPick(LINKS);
        const source = weightedPick(SOURCES).name;
        s.totalClicks++;
        s.perLink[link.key].clicks++;
        s.daily[today] = (s.daily[today] || 0) + 1;
        s.clickToastCounter++;

        const entry = {
          t: Date.now(),
          key: link.key,
          name: link.name,
          source,
          type: "Click",
          amount: 0,
        };
        s.activity.unshift(entry);

        // conversion?
        if (Math.random() < conversionRate(elapsed)) {
          const amount = +earnFor(link).toFixed(2);
          s.totalConversions++;
          s.totalEarnings = +(s.totalEarnings + amount).toFixed(2);
          s.perLink[link.key].conversions++;
          s.perLink[link.key].earnings = +(
            s.perLink[link.key].earnings + amount
          ).toFixed(2);
          s.activity.unshift({
            t: Date.now(),
            key: link.key,
            name: link.name,
            source,
            type: "Conversion",
            amount,
          });
          convHappened = true;
          toast.success(`+$${amount.toFixed(2)} conversion — ${link.name}`, {
            icon: "💰",
          });
        }

        if (s.clickToastCounter % 5 === 0) {
          toast(`New click on ${link.name} via ${source}`, { icon: "👆" });
        }
      }

      s.activity = s.activity.slice(0, 60);
      commit();
    }

    schedule();
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [userId, state !== null]);

  return { state, loading };
}
