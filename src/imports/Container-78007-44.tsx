import svgPaths from "./svg-7hg6d30srz";

function Paragraph() {
  return (
    <div className="h-[18px] relative shrink-0 w-[356.156px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-[356.156px]">
        <p className="absolute font-['Open_Sans:Regular',_sans-serif] font-normal leading-[18px] left-0 text-[12px] text-nowrap text-white top-[-0.5px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Incident Response Objectives, Current Actions, Planned Actions:
        </p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[16px] size-[13px] top-[4.88px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
        <g id="Icon">
          <path d="M2.70833 6.5H10.2917" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
          <path d="M6.5 2.70833V10.2917" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-[#01669f] h-[22.75px] left-[224px] rounded-[4px] top-[1.75px] w-[130.625px]" data-name="Button">
      <Icon />
      <p className="absolute font-['Open_Sans:Regular',_sans-serif] font-normal leading-[18px] left-[37px] text-[12px] text-nowrap text-white top-[1.88px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Add Objective
      </p>
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute h-[26px] left-0 rounded-[4px] top-[0.25px] w-[195px]" data-name="Text Input">
      <div className="box-border content-stretch flex h-[26px] items-center overflow-clip px-[26px] py-[3.25px] relative rounded-[inherit] w-[195px]">
        <p className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#6e757c] text-[12px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Search
        </p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#6e757c] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[8px] size-[11.375px] top-[7.44px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p3a3bec00} id="Vector" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.710938" />
          <path d={svgPaths.p380aaa80} id="Vector_2" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.710938" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[26.25px] left-0 top-0 w-[195px]" data-name="Container">
      <TextInput />
      <Icon1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[26.25px] relative shrink-0 w-[354.625px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[26.25px] relative w-[354.625px]">
        <Button />
        <Container />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[60.25px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[60.25px] items-center justify-between px-[13px] py-0 relative w-full">
          <Paragraph />
          <Container1 />
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="bg-[#222529] box-border content-stretch flex flex-col h-[61.25px] items-start pb-px pt-0 px-0 relative rounded-tl-[6px] rounded-tr-[6px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#6e757c] border-[0px_0px_1px] border-solid inset-0 pointer-events-none rounded-tl-[6px] rounded-tr-[6px]" />
      <Container2 />
    </div>
  );
}

export default function Container4() {
  return (
    <div className="bg-[#14171a] relative rounded-tl-[6px] rounded-tr-[6px] size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#6e757c] border-[0px_0px_1px] border-solid inset-0 pointer-events-none rounded-tl-[6px] rounded-tr-[6px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start pb-px pt-[13px] px-[13px] relative size-full">
          <Container3 />
        </div>
      </div>
    </div>
  );
}