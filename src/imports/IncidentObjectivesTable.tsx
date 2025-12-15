import svgPaths from "./svg-300ru7qiwa";

function Text() {
  return (
    <div className="absolute h-[24px] left-0 top-[6px] w-[141.695px]" data-name="Text">
      <p className="absolute font-['Open_Sans:Regular',_sans-serif] font-normal leading-[24px] left-0 text-[16px] text-nowrap text-white top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Incident Objectives
      </p>
    </div>
  );
}

function Input() {
  return (
    <div className="absolute h-[36px] left-0 rounded-[4px] top-0 w-[384px]" data-name="Input">
      <div className="box-border content-stretch flex h-[36px] items-center overflow-clip pl-[36px] pr-[12px] py-[4px] relative rounded-[inherit] w-[384px]">
        <p className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[normal] relative shrink-0 text-[#6e757c] text-[16px] text-nowrap whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Search objectives...
        </p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#6e757c] border-solid inset-0 pointer-events-none rounded-[4px]" />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M14 14L11.1067 11.1067" id="Vector" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p107a080} id="Vector_2" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute h-[36px] left-[157.69px] top-0 w-[384px]" data-name="Container">
      <Input />
      <Icon />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[36px] relative shrink-0 w-[541.695px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[36px] relative w-[541.695px]">
        <Text />
        <Container />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[8px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#01669f] h-[32px] relative rounded-[4px] shrink-0 w-[153.492px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] relative w-[153.492px]">
        <Icon1 />
        <p className="absolute font-['Open_Sans:Regular',_sans-serif] font-normal leading-[24px] left-[40px] text-[16px] text-nowrap text-white top-[4px] whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Add Objective
        </p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[69px] relative shrink-0 w-[1152px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#6e757c] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[69px] items-center justify-between pb-px pt-0 px-[24px] relative w-[1152px]">
        <Container1 />
        <Button />
      </div>
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] left-[24px] rounded-[4px] size-[16px] top-[23.5px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[#6e757c] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function TableCell() {
  return (
    <div className="absolute h-[65px] left-0 top-0 w-[64px]" data-name="Table Cell">
      <PrimitiveButton />
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute content-stretch flex h-[21.5px] items-start left-[24px] top-[21.5px] w-[450.742px]" data-name="Text">
      <p className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Establish incident command structure and unified command
      </p>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="absolute h-[65px] left-[64px] top-0 w-[968px]" data-name="Table Cell">
      <Text1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_84003_213)" id="Icon">
          <path d={svgPaths.p785ba00} id="Vector" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10 3.33333L12.6667 6" id="Vector_2" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_84003_213">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon2 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6.66667 7.33333V11.3333" id="Vector" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_2" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p37e28100} id="Vector_3" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 4H14" id="Vector_4" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2ffbeb80} id="Vector_5" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="basis-0 grow h-[32px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-center justify-center relative w-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[32px] items-center left-[24px] top-[16.5px] w-[72px]" data-name="Container">
      <Button1 />
      <Button2 />
    </div>
  );
}

function TableCell2() {
  return (
    <div className="absolute h-[65px] left-[1032px] top-0 w-[120px]" data-name="Table Cell">
      <Container3 />
    </div>
  );
}

function TableRow() {
  return (
    <div className="absolute h-[65px] left-0 top-0 w-[1152px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#6e757c] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableCell />
      <TableCell1 />
      <TableCell2 />
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] left-[24px] rounded-[4px] size-[16px] top-[23.5px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[#6e757c] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function TableCell3() {
  return (
    <div className="absolute h-[65px] left-0 top-0 w-[64px]" data-name="Table Cell">
      <PrimitiveButton1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute content-stretch flex h-[21.5px] items-start left-[24px] top-[21.5px] w-[420.672px]" data-name="Text">
      <p className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Ensure safety of all responders and affected populations
      </p>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="absolute h-[65px] left-[64px] top-0 w-[968px]" data-name="Table Cell">
      <Text2 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_84003_213)" id="Icon">
          <path d={svgPaths.p785ba00} id="Vector" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10 3.33333L12.6667 6" id="Vector_2" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_84003_213">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon4 />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6.66667 7.33333V11.3333" id="Vector" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_2" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p37e28100} id="Vector_3" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 4H14" id="Vector_4" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2ffbeb80} id="Vector_5" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="basis-0 grow h-[32px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-center justify-center relative w-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[32px] items-center left-[24px] top-[16.5px] w-[72px]" data-name="Container">
      <Button3 />
      <Button4 />
    </div>
  );
}

function TableCell5() {
  return (
    <div className="absolute h-[65px] left-[1032px] top-0 w-[120px]" data-name="Table Cell">
      <Container4 />
    </div>
  );
}

function TableRow1() {
  return (
    <div className="absolute h-[65px] left-0 top-[65px] w-[1152px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#6e757c] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableCell3 />
      <TableCell4 />
      <TableCell5 />
    </div>
  );
}

function PrimitiveButton2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] left-[24px] rounded-[4px] size-[16px] top-[23.5px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[#6e757c] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function TableCell6() {
  return (
    <div className="absolute h-[65px] left-0 top-0 w-[64px]" data-name="Table Cell">
      <PrimitiveButton2 />
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute content-stretch flex h-[21.5px] items-start left-[24px] top-[21.5px] w-[415.391px]" data-name="Text">
      <p className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Conduct search and rescue operations in affected areas
      </p>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="absolute h-[65px] left-[64px] top-0 w-[968px]" data-name="Table Cell">
      <Text3 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_84003_198)" id="Icon">
          <path d={svgPaths.p23dee900} id="Vector" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10 3.33333L12.6667 6" id="Vector_2" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_84003_198">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon6 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6.66667 7.33333V11.3333" id="Vector" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_2" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p37e28100} id="Vector_3" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 4H14" id="Vector_4" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2ffbeb80} id="Vector_5" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="basis-0 grow h-[32px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-center justify-center relative w-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[32px] items-center left-[24px] top-[16.5px] w-[72px]" data-name="Container">
      <Button5 />
      <Button6 />
    </div>
  );
}

function TableCell8() {
  return (
    <div className="absolute h-[65px] left-[1032px] top-0 w-[120px]" data-name="Table Cell">
      <Container5 />
    </div>
  );
}

function TableRow2() {
  return (
    <div className="absolute h-[65px] left-0 top-[130px] w-[1152px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#6e757c] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableCell6 />
      <TableCell7 />
      <TableCell8 />
    </div>
  );
}

function PrimitiveButton3() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] left-[24px] rounded-[4px] size-[16px] top-[23.5px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[#6e757c] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function TableCell9() {
  return (
    <div className="absolute h-[65px] left-0 top-0 w-[64px]" data-name="Table Cell">
      <PrimitiveButton3 />
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute content-stretch flex h-[21.5px] items-start left-[24px] top-[21.5px] w-[425.531px]" data-name="Text">
      <p className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Provide emergency medical care and transport to injured
      </p>
    </div>
  );
}

function TableCell10() {
  return (
    <div className="absolute h-[65px] left-[64px] top-0 w-[968px]" data-name="Table Cell">
      <Text4 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_84003_198)" id="Icon">
          <path d={svgPaths.p23dee900} id="Vector" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10 3.33333L12.6667 6" id="Vector_2" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_84003_198">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon8 />
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6.66667 7.33333V11.3333" id="Vector" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_2" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p37e28100} id="Vector_3" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 4H14" id="Vector_4" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2ffbeb80} id="Vector_5" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="basis-0 grow h-[32px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-center justify-center relative w-full">
        <Icon9 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[32px] items-center left-[24px] top-[16.5px] w-[72px]" data-name="Container">
      <Button7 />
      <Button8 />
    </div>
  );
}

function TableCell11() {
  return (
    <div className="absolute h-[65px] left-[1032px] top-0 w-[120px]" data-name="Table Cell">
      <Container6 />
    </div>
  );
}

function TableRow3() {
  return (
    <div className="absolute h-[65px] left-0 top-[195px] w-[1152px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#6e757c] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableCell9 />
      <TableCell10 />
      <TableCell11 />
    </div>
  );
}

function PrimitiveButton4() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] left-[24px] rounded-[4px] size-[16px] top-[23.5px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[#6e757c] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function TableCell12() {
  return (
    <div className="absolute h-[65px] left-0 top-0 w-[64px]" data-name="Table Cell">
      <PrimitiveButton4 />
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute content-stretch flex h-[21.5px] items-start left-[24px] top-[21.5px] w-[429.648px]" data-name="Text">
      <p className="font-['Open_Sans:Regular',_sans-serif] font-normal leading-[24px] relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
        Secure the incident scene and establish perimeter control
      </p>
    </div>
  );
}

function TableCell13() {
  return (
    <div className="absolute h-[65px] left-[64px] top-0 w-[968px]" data-name="Table Cell">
      <Text5 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_84003_198)" id="Icon">
          <path d={svgPaths.p23dee900} id="Vector" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10 3.33333L12.6667 6" id="Vector_2" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_84003_198">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon10 />
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6.66667 7.33333V11.3333" id="Vector" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_2" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p37e28100} id="Vector_3" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2 4H14" id="Vector_4" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2ffbeb80} id="Vector_5" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="basis-0 grow h-[32px] min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[32px] items-center justify-center relative w-full">
        <Icon11 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[32px] items-center left-[24px] top-[16.5px] w-[72px]" data-name="Container">
      <Button9 />
      <Button10 />
    </div>
  );
}

function TableCell14() {
  return (
    <div className="absolute h-[65px] left-[1032px] top-0 w-[120px]" data-name="Table Cell">
      <Container7 />
    </div>
  );
}

function TableRow4() {
  return (
    <div className="absolute h-[65px] left-0 top-[260px] w-[1152px]" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[#6e757c] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableCell12 />
      <TableCell13 />
      <TableCell14 />
    </div>
  );
}

function TableBody() {
  return (
    <div className="absolute h-[325px] left-0 top-[48.5px] w-[1152px]" data-name="Table Body">
      <TableRow />
      <TableRow1 />
      <TableRow2 />
      <TableRow3 />
      <TableRow4 />
    </div>
  );
}

function Table() {
  return (
    <div className="absolute h-[374px] left-0 top-0 w-[1152px]" data-name="Table">
      <TableBody />
    </div>
  );
}

function PrimitiveButton5() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] left-[24px] rounded-[4px] size-[16px] top-[14.5px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[#6e757c] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="absolute h-[48.5px] left-0 top-0 w-[64px]" data-name="Header Cell">
      <PrimitiveButton5 />
    </div>
  );
}

function Text6() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-full">
        <p className="absolute font-['Open_Sans:Regular',_sans-serif] font-normal leading-[24px] left-0 text-[16px] text-nowrap text-white top-0 whitespace-pre" style={{ fontVariationSettings: "'wdth' 100" }}>
          Objective
        </p>
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.pcaa3f40} id="Vector" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M11.3333 13.3333V2.66667" id="Vector_2" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p216cf1e0} id="Vector_3" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M4.66667 2.66667V13.3333" id="Vector_4" stroke="var(--stroke-0, #6E757C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[24px] items-center left-[24px] top-[12px] w-[93.641px]" data-name="Button">
      <Text6 />
      <Icon12 />
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="absolute h-[48.5px] left-[64px] top-0 w-[968px]" data-name="Header Cell">
      <Button11 />
    </div>
  );
}

function HeaderCell2() {
  return <div className="absolute h-[48.5px] left-[1032px] top-0 w-[120px]" data-name="Header Cell" />;
}

function TableRow5() {
  return (
    <div className="absolute h-[48.5px] left-0 top-0 w-[1152px]" data-name="Table Row">
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="absolute bg-[#222529] h-[48.5px] left-0 top-0 w-[1152px]" data-name="Table Header">
      <div aria-hidden="true" className="absolute border-[#6e757c] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <TableRow5 />
    </div>
  );
}

function Container8() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[1152px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full overflow-clip relative rounded-[inherit] w-[1152px]">
        <Table />
        <TableHeader />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[24px] relative shrink-0 w-[87.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[87.75px]">
        <p className="absolute font-['Open_Sans:Regular',_sans-serif] font-normal leading-[24px] left-0 text-[#6e757c] text-[16px] top-0 w-[88px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          5 objectives
        </p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-[#222529] h-[49px] relative shrink-0 w-[1152px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#6e757c] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[49px] items-center justify-between pb-0 pl-[24px] pr-[1040.25px] pt-px relative w-[1152px]">
        <Text7 />
      </div>
    </div>
  );
}

export default function IncidentObjectivesTable() {
  return (
    <div className="bg-[#222529] box-border content-stretch flex flex-col items-start overflow-clip relative rounded-[6px] shadow-[0px_1px_2px_0px_rgba(16,40,34,0.05)] size-full" data-name="IncidentObjectivesTable">
      <Container2 />
      <Container8 />
      <Container9 />
    </div>
  );
}