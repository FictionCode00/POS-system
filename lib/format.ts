// Currency formatting. Hand-rolled to avoid relying on Intl being present in
// the JS engine. Indian digit grouping (xx,xx,xxx).

function groupIndian(intPart: string): string {
  if (intPart.length <= 3) return intPart;
  const last3 = intPart.slice(-3);
  const rest = intPart.slice(0, -3);
  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last3;
}

/** ₹861.00 — two decimals, used for totals and line amounts. */
export function rupees(amount: number): string {
  const fixed = Math.abs(amount).toFixed(2);
  const [intPart, dec] = fixed.split(".");
  return `₹${groupIndian(intPart)}.${dec}`;
}

/** ₹861 — no decimals, used in compact chips like the floating cart pill. */
export function rupeesShort(amount: number): string {
  const intPart = Math.round(amount).toString();
  return `₹${groupIndian(intPart)}`;
}
