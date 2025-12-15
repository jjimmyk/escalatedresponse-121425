import svgPaths from "./svg-nzhx42a463";

function Icon() {
  return (
    <div className="absolute left-[11px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p82fb540} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 12.6667V3.33333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

export default function Button() {
  return (
    <div className="bg-[#14171a] relative rounded-[4px] size-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#6e757c] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Icon />
      <p className="absolute font-['Open_Sans:Regular',_sans-serif] font-normal leading-[24px] left-[35px] text-[16px] text-nowrap text-white top-[4px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Escalate Response
      </p>
    </div>
  );
}