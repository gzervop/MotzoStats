import { useMemo, useState } from "react";

const POT_BADGE: Record<string, string> = {
  "Pot 1": "bg-red-100 text-red-800",
  "Pot 2": "bg-amber-100 text-amber-800",
  "Pot 3": "bg-blue-100 text-blue-800",
  "Pot 4": "bg-emerald-100 text-emerald-800",
};

const ALIAS: Record<string, string> = {
  "GNK Dinamo": "Dinamo Zagreb",
  "Crvena Zvezda": "Red Star Belgrade",
  "Salzburg": "Red Bull Salzburg",
  "Maccabi Tel-Aviv": "Maccabi Tel Aviv",
  "Freiburg": "SC Freiburg",
  "Ludogorets": "Ludogorets Razgrad",
  "Stuttgart": "VfB Stuttgart",
  "Malmö": "Malmö FF",
  "Celta": "Celta Vigo",
};

const baseRows = [
  { id: 1, club: "Roma", pot: "Pot 1", country: "ITA", coef: 104.5, marketValue: 376680000, opponents: "Lille, Viktoria Plzeň, Midtjylland, VfB Stuttgart, Rangers, Celtic, Nice, Panathinaikos" },
  { id: 2, club: "Porto", pot: "Pot 1", country: "POR", coef: 79.75, marketValue: 345500000, opponents: "Rangers, Red Star Belgrade, Nice, Malmö FF, Red Bull Salzburg, Viktoria Plzeň, Nottingham Forest, Utrecht" },
  { id: 3, club: "Rangers", pot: "Pot 1", country: "SCO", coef: 71.25, marketValue: 96900000, opponents: "Roma, Braga, Ludogorets Razgrad, Genk, Porto, Ferencváros, Sturm Graz, Brann" },
  { id: 4, club: "Feyenoord", pot: "Pot 1", country: "NED", coef: 71.0, marketValue: 218350000, opponents: "Aston Villa, Celtic, Sturm Graz, Panathinaikos, Real Betis, Braga, FCSB, VfB Stuttgart" },
  { id: 5, club: "Lille", pot: "Pot 1", country: "FRA", coef: 66.0, marketValue: 218700000, opponents: "Dinamo Zagreb, PAOK, SC Freiburg, Brann, Roma, Red Star Belgrade, Young Boys, Celta Vigo" },
  { id: 6, club: "Dinamo Zagreb", pot: "Pot 1", country: "CRO", coef: 56.0, marketValue: 56100000, opponents: "Real Betis, Fenerbahçe, FCSB, Celta Vigo, Lille, Maccabi Tel Aviv, Midtjylland, Malmö FF" },
  { id: 7, club: "Real Betis", pot: "Pot 1", country: "ESP", coef: 52.25, marketValue: 154000000, opponents: "Feyenoord, Lyon, Nottingham Forest, Utrecht, Dinamo Zagreb, PAOK, Ludogorets Razgrad, Genk" },
  { id: 8, club: "Red Bull Salzburg", pot: "Pot 1", country: "AUT", coef: 48.0, marketValue: 121000000, opponents: "Porto, Ferencváros, Basel, Go Ahead Eagles, Aston Villa, Lyon, SC Freiburg, Bologna" },
  { id: 9, club: "Aston Villa", pot: "Pot 1", country: "ENG", coef: 47.25, marketValue: 491000000, opponents: "Red Bull Salzburg, Maccabi Tel Aviv, Young Boys, Bologna, Feyenoord, Fenerbahçe, Basel, Go Ahead Eagles" },

  { id: 10, club: "Fenerbahçe", pot: "Pot 2", country: "TUR", coef: 47.25, marketValue: 299130000, opponents: "Aston Villa, Ferencváros, Nice, VfB Stuttgart, Dinamo Zagreb, Viktoria Plzeň, FCSB, Brann" },
  { id: 11, club: "Braga", pot: "Pot 2", country: "POR", coef: 46.0, marketValue: 161500000, opponents: "Feyenoord, Red Star Belgrade, Nottingham Forest, Genk, Rangers, Celtic, Nice, Go Ahead Eagles" },
  { id: 12, club: "Red Star Belgrade", pot: "Pot 2", country: "SRB", coef: 44.0, marketValue: 79200000, opponents: "Lille, Celtic, FCSB, Celta Vigo, Porto, Braga, Sturm Graz, Malmö FF" },
  { id: 13, club: "Lyon", pot: "Pot 2", country: "FRA", coef: 43.75, marketValue: 181450000, opponents: "Red Bull Salzburg, PAOK, Basel, Go Ahead Eagles, Real Betis, Maccabi Tel Aviv, Young Boys, Utrecht" },
  { id: 14, club: "PAOK", pot: "Pot 2", country: "GRE", coef: 42.25, marketValue: 88750000, opponents: "Real Betis, Maccabi Tel Aviv, Young Boys, Brann, Lille, Lyon, Ludogorets Razgrad, Celta Vigo" },
  { id: 15, club: "Viktoria Plzeň", pot: "Pot 2", country: "CZE", coef: 39.25, marketValue: 48180000, opponents: "Porto, Fenerbahçe, SC Freiburg, Malmö FF, Roma, Ferencváros, Basel, Panathinaikos" },
  { id: 16, club: "Ferencváros", pot: "Pot 2", country: "HUN", coef: 39.0, marketValue: 47700000, opponents: "Rangers, Viktoria Plzeň, Ludogorets Razgrad, Panathinaikos, Red Bull Salzburg, Fenerbahçe, Nottingham Forest, Genk" },
  { id: 17, club: "Celtic", pot: "Pot 2", country: "SCO", coef: 38.0, marketValue: 137400000, opponents: "Roma, Braga, Sturm Graz, Utrecht, Feyenoord, Red Star Belgrade, Midtjylland, Bologna" },
  { id: 18, club: "Maccabi Tel Aviv", pot: "Pot 2", country: "ISR", coef: 37.5, marketValue: 27530000, opponents: "Dinamo Zagreb, Lyon, Midtjylland, Bologna, Aston Villa, PAOK, SC Freiburg, VfB Stuttgart" },

  { id: 19, club: "Young Boys", pot: "Pot 3", country: "SUI", coef: 34.5, marketValue: 66800000, opponents: "Lille, Lyon, Ludogorets Razgrad, Panathinaikos, Aston Villa, PAOK, FCSB, VfB Stuttgart" },
  { id: 20, club: "Basel", pot: "Pot 3", country: "SUI", coef: 33.0, marketValue: 68200000, opponents: "Aston Villa, Viktoria Plzeň, FCSB, VfB Stuttgart, Red Bull Salzburg, Lyon, SC Freiburg, Genk" },
  { id: 21, club: "Midtjylland", pot: "Pot 3", country: "DEN", coef: 32.75, marketValue: 77900000, opponents: "Dinamo Zagreb, Celtic, Sturm Graz, Genk, Roma, Maccabi Tel Aviv, Nottingham Forest, Brann" },
  { id: 22, club: "SC Freiburg", pot: "Pot 3", country: "GER", coef: 28.0, marketValue: 167700000, opponents: "Red Bull Salzburg, Maccabi Tel Aviv, Basel, Utrecht, Lille, Viktoria Plzeň, Nice, Bologna" },
  { id: 23, club: "Ludogorets Razgrad", pot: "Pot 3", country: "BUL", coef: 24.0, marketValue: 48200000, opponents: "Real Betis, PAOK, Nice, Celta Vigo, Rangers, Ferencváros, Young Boys, Malmö FF" },
  { id: 24, club: "Nottingham Forest", pot: "Pot 3", country: "ENG", coef: 23.039, marketValue: 523000000, opponents: "Porto, Ferencváros, Midtjylland, Malmö FF, Real Betis, Braga, Sturm Graz, Utrecht" },
  { id: 25, club: "Sturm Graz", pot: "Pot 3", country: "AUT", coef: 23.0, marketValue: 57130000, opponents: "Rangers, Red Star Belgrade, Nottingham Forest, Brann, Feyenoord, Celtic, Midtjylland, Panathinaikos" },
  { id: 26, club: "FCSB", pot: "Pot 3", country: "ROU", coef: 22.5, marketValue: 48430000, opponents: "Feyenoord, Fenerbahçe, Young Boys, Bologna, Dinamo Zagreb, Red Star Belgrade, Basel, Go Ahead Eagles" },
  { id: 27, club: "Nice", pot: "Pot 3", country: "FRA", coef: 20.0, marketValue: 174600000, opponents: "Roma, Braga, SC Freiburg, Go Ahead Eagles, Porto, Fenerbahçe, Ludogorets Razgrad, Celta Vigo" },

  { id: 28, club: "Bologna", pot: "Pot 4", country: "ITA", coef: 19.446, marketValue: 282200000, opponents: "Red Bull Salzburg, Celtic, SC Freiburg, Brann, Aston Villa, Maccabi Tel Aviv, FCSB, Celta Vigo" },
  { id: 29, club: "Celta Vigo", pot: "Pot 4", country: "ESP", coef: 18.89, marketValue: 120500000, opponents: "Lille, PAOK, Nice, Bologna, Dinamo Zagreb, Red Star Belgrade, Ludogorets Razgrad, SC Freiburg" },
  { id: 30, club: "VfB Stuttgart", pot: "Pot 4", country: "GER", coef: 17.266, marketValue: 307630000, opponents: "Feyenoord, Maccabi Tel Aviv, Young Boys, Celta Vigo, Roma, Fenerbahçe, Basel, Go Ahead Eagles" },
  { id: 31, club: "Panathinaikos", pot: "Pot 4", country: "GRE", coef: 16.0, marketValue: 97750000, opponents: "Roma, Viktoria Plzeň, Sturm Graz, Go Ahead Eagles, Feyenoord, Ferencváros, Young Boys, Malmö FF" },
  { id: 32, club: "Malmö FF", pot: "Pot 4", country: "SWE", coef: 14.5, marketValue: 37180000, opponents: "Dinamo Zagreb, Red Star Belgrade, Ludogorets Razgrad, Panathinaikos, Porto, Viktoria Plzeň, Nottingham Forest, Genk" },
  { id: 33, club: "Go Ahead Eagles", pot: "Pot 4", country: "NED", coef: 13.43, marketValue: 28250000, opponents: "Aston Villa, Braga, FCSB, VfB Stuttgart, Red Bull Salzburg, Lyon, Nice, Panathinaikos" },
  { id: 34, club: "Utrecht", pot: "Pot 4", country: "NED", coef: 13.43, marketValue: 66950000, opponents: "Porto, Lyon, Nottingham Forest, Genk, Real Betis, Celtic, SC Freiburg, Brann" },
  { id: 35, club: "Genk", pot: "Pot 4", country: "BEL", coef: 11.37, marketValue: 152850000, opponents: "Real Betis, Ferencváros, Basel, Malmö FF, Rangers, Braga, Midtjylland, Utrecht" },
  { id: 36, club: "Brann", pot: "Pot 4", country: "NOR", coef: 7.937, marketValue: 26100000, opponents: "Rangers, Fenerbahçe, Midtjylland, Utrecht, Lille, PAOK, Sturm Graz, Bologna" },
] as const;

type Row = typeof baseRows[number] & {
  oppCoefSum: number;
  oppMarketValueSum: number;
};

type SortKey = keyof Row;

type SortState = { key: SortKey; dir: "asc" | "desc" };

function formatNumber(n: number) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 3 });
}

export default function EuropaLeagueTable() {
  const [sort, setSort] = useState<SortState>({ key: "club", dir: "asc" });

  const { coefByClub, mvByClub, potByClub } = useMemo(() => {
    const coef = new Map<string, number>();
    const mv = new Map<string, number>();
    const pot = new Map<string, string>();
    for (const r of baseRows) {
      coef.set(r.club, r.coef);
      mv.set(r.club, r.marketValue);
      pot.set(r.club, r.pot);
    }
    for (const [alias, target] of Object.entries(ALIAS)) {
      if (coef.has(target)) {
        coef.set(alias, coef.get(target)!);
        mv.set(alias, mv.get(target)!);
        pot.set(alias, pot.get(target)!);
      }
    }
    return { coefByClub: coef, mvByClub: mv, potByClub: pot };
  }, []);

  const rows: Row[] = useMemo(() => {
    return baseRows.map((r) => {
      const opponents = r.opponents.split(/,\s*/).map((o) => ALIAS[o] || o);
      const oppCoefSum = opponents.reduce((sum, o) => sum + (coefByClub.get(o) || 0), 0);
      const oppMarketValueSum = opponents.reduce((sum, o) => sum + (mvByClub.get(o) || 0), 0);
      return { ...r, oppCoefSum, oppMarketValueSum };
    });
  }, [coefByClub, mvByClub]);

  const sorted = useMemo(() => {
    const data = [...rows];
    data.sort((a, b) => {
      const k = sort.key;
      const av = a[k] as any;
      const bv = b[k] as any;
      if (typeof av === "number" && typeof bv === "number") {
        return sort.dir === "asc" ? av - bv : bv - av;
      }
      const as = String(av).toLowerCase();
      const bs = String(bv).toLowerCase();
      if (as < bs) return sort.dir === "asc" ? -1 : 1;
      if (as > bs) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });
    return data;
  }, [rows, sort]);

  function toggleSort(key: SortKey) {
    setSort((prev) => (prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Europa League 2025/26 — League Phase Table</h1>
      <div className="overflow-x-auto rounded-2xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {[
                { key: "id", label: "#" },
                { key: "club", label: "Club" },
                { key: "pot", label: "Pot" },
                { key: "country", label: "Country" },
                { key: "coef", label: "UEFA Coefficient (points)" },
                { key: "marketValue", label: "Market Value (€)" },
                { key: "opponents", label: "Opponents (8)" },
                { key: "oppCoefSum", label: "Opponents Coef. Sum" },
                { key: "oppMarketValueSum", label: "Opp. Market Value Sum (€)" },
              ].map((c) => (
                <th
                  key={c.key as string}
                  onClick={() => toggleSort(c.key as SortKey)}
                  className="px-3 py-2 text-left font-semibold cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2">
                    <span>{c.label}</span>
                    {sort.key === (c.key as SortKey) && (
                      <span aria-hidden>{sort.dir === "asc" ? "▲" : "▼"}</span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((r, idx) => (
              <tr key={r.id} className="odd:bg-white even:bg-gray-50">
                <td className="px-3 py-2 text-right">{idx + 1}</td>
                <td className="px-3 py-2 whitespace-nowrap">{r.club}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${POT_BADGE[r.pot]}`}>{r.pot}</span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap">{r.country}</td>
                <td className="px-3 py-2 text-right">{formatNumber(r.coef)}</td>
                <td className="px-3 py-2 text-right">{r.marketValue.toLocaleString()}</td>
                <td className="px-3 py-2">
                  {r.opponents.split(/,\s*/).map((o, i) => {
                    const name = ALIAS[o] || o;
                    const pot = potByClub.get(name);
                    return (
                      <span key={i} className={`inline-block m-0.5 px-2 py-0.5 rounded-full text-xs font-semibold ${pot ? POT_BADGE[pot] : "bg-gray-100 text-gray-800"}`}>
                        {name}
                      </span>
                    );
                  })}
                </td>
                <td className="px-3 py-2 text-right">{formatNumber(r.oppCoefSum)}</td>
                <td className="px-3 py-2 text-right">{r.oppMarketValueSum.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
