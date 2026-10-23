import type { ReactNode } from "react";
import styles from "./why-section.module.css";

const visualKinds = ["pricing", "delivery", "technology", "outcomes", "architecture", "support", "communication"] as const;
type VisualKind = (typeof visualKinds)[number];

function SvgFrame({ children, kind }: { children: ReactNode; kind: VisualKind }) {
  return (
    <div className={styles.visual} data-proof-visual={kind}>
      <svg aria-hidden="true" className={styles.visualSvg} viewBox="0 0 520 230">{children}</svg>
    </div>
  );
}

function PricingVisual() {
  return <SvgFrame kind="pricing"><g className={styles.pricingTrack}><path d="M76 76H444M76 116H444M76 156H444" /></g><g className={styles.pricingFill}><path d="M76 76H298M76 116H356M76 156H236" /></g><g className={styles.pricingKnobs}><circle cx="298" cy="76" r="13" /><circle cx="356" cy="116" r="13" /><circle cx="236" cy="156" r="13" /></g><path className={styles.visualBaseline} d="M76 194H444" /></SvgFrame>;
}

function DeliveryVisual() {
  return <SvgFrame kind="delivery"><circle className={styles.deliveryClock} cx="260" cy="117" r="76" /><path className={styles.deliveryTicks} d="M260 32V49M260 185V202M175 117H192M328 117H345" /><g className={styles.deliveryHands}><path d="M260 117V72M260 117L304 136" /><circle cx="260" cy="117" r="9" /></g><path className={styles.deliveryPulse} d="M99 170C139 170 142 142 178 142C209 142 211 170 249 170H420" /></SvgFrame>;
}

function TechnologyVisual() {
  return <SvgFrame kind="technology"><g className={styles.techOrbit}><ellipse cx="260" cy="117" rx="142" ry="62" /><ellipse cx="260" cy="117" rx="62" ry="142" transform="rotate(62 260 117)" /><ellipse cx="260" cy="117" rx="62" ry="142" transform="rotate(-62 260 117)" /></g><g className={styles.techCore}><rect x="222" y="79" width="76" height="76" rx="18" /><path d="M243 104H277M243 117H287M243 130H268" /></g><g className={styles.techNodes}><circle cx="118" cy="117" r="10" /><circle cx="330" cy="51" r="10" /><circle cx="366" cy="164" r="10" /></g></SvgFrame>;
}

function OutcomesVisual() {
  return <SvgFrame kind="outcomes"><path className={styles.outcomePath} d="M74 160C135 160 137 82 208 82C275 82 272 160 340 160C392 160 404 124 446 124" /><g className={styles.outcomeStart}><rect x="62" y="139" width="48" height="42" rx="10" /><path d="M74 151H97M74 160H91M74 169H98" /></g><g className={styles.outcomeTarget}><circle cx="447" cy="124" r="46" /><circle cx="447" cy="124" r="29" /><circle cx="447" cy="124" r="11" /></g><circle className={styles.outcomePulse} cx="216" cy="87" r="8" /></SvgFrame>;
}

function ArchitectureVisual() {
  return <SvgFrame kind="architecture"><g className={styles.architectureBlocks}><rect x="88" y="154" width="344" height="34" rx="8" /><rect x="126" y="110" width="268" height="34" rx="8" /><rect x="166" y="66" width="188" height="34" rx="8" /></g><g className={styles.architectureNodes}><circle cx="112" cy="171" r="6" /><circle cx="150" cy="127" r="6" /><circle cx="190" cy="83" r="6" /></g><path className={styles.architectureRise} d="M424 171V52M404 72L424 52L444 72" /></SvgFrame>;
}

function SupportVisual() {
  return <SvgFrame kind="support"><path className={styles.supportLoop} d="M174 161A92 92 0 1 1 347 151" /><path className={styles.supportArrow} d="M344 116L347 151L313 148" /><g className={styles.supportShield}><path d="M260 65L316 87V126C316 159 293 181 260 194C227 181 204 159 204 126V87L260 65Z" /><path d="M236 128L253 145L286 108" /></g><circle className={styles.supportPulse} cx="174" cy="161" r="11" /></SvgFrame>;
}

function CommunicationVisual() {
  return <SvgFrame kind="communication"><path className={styles.communicationLine} d="M96 78H222M298 78H424M96 161H222M298 161H424M260 99V140" /><g className={styles.communicationNodes}><rect x="70" y="54" width="118" height="48" rx="14" /><rect x="332" y="54" width="118" height="48" rx="14" /><rect x="70" y="137" width="118" height="48" rx="14" /><rect x="332" y="137" width="118" height="48" rx="14" /></g><g className={styles.communicationCopy}><path d="M91 70H164M91 84H142M353 70H427M353 84H405M91 153H151M91 167H166M353 153H414M353 167H398" /></g><g className={styles.communicationCore}><circle cx="260" cy="78" r="28" /><circle cx="260" cy="161" r="28" /><path d="M248 78L257 87L274 69M248 161L257 170L274 152" /></g></SvgFrame>;
}

const visuals = [PricingVisual, DeliveryVisual, TechnologyVisual, OutcomesVisual, ArchitectureVisual, SupportVisual, CommunicationVisual] as const;

export function WhyProofVisual({ index }: { index: number }) {
  const Visual = visuals[index % visuals.length];
  return <Visual />;
}
