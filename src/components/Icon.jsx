export const paths = {
  dashboard:     "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
  locales:       "M3 9h18M9 21V9m6 12V9M3 3h18v6H3z",
  contratos:     "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6",
  expedientes:   "M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z",
  incrementos:   "M23 6l-9.5 9.5-5-5L1 18M17 6h6v6",
  financiero:    "M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6",
  arrendatarios: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8z",
  reportes:      "M18 20V10M12 20V4M6 20v-6",
  config:        "M12 20a8 8 0 100-16 8 8 0 000 16zM12 14a2 2 0 100-4 2 2 0 000 4z",
  menu:          "M3 12h18M3 6h18M3 18h18",
  plus:          "M12 5v14M5 12h14",
  search:        "M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z",
  close:         "M18 6L6 18M6 6l12 12",
  chevron:       "M6 9l6 6 6-6",
};

export default function Icon({ name, size = 18 }) {
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  );
}