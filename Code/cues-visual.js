/* Editable illustrations and visual cues, with no full-scene raster backplate. */
window.canteenVisual = (() => {
 const campus = '<svg viewBox="0 0 420 200" aria-label="College canteen building"><g fill="#f7f2e4" stroke="#456653" stroke-width="3" stroke-linejoin="round">'+
 '<path d="M22 174H396M45 170V82H373V170M25 83L209 19 394 83Z"/><path d="M170 170v-64h78v64M64 106h68v40H64zM283 106h68v40h-68z"/>'+
 '<path d="M210 106v64M98 106v40M317 106v40M64 126h68m151 0h68" fill="none"/>'+
 '<path d="M30 83h358v17H30z" fill="#d8e1d1"/><path d="M35 100h348" fill="none"/>'+
 '<circle cx="210" cy="58" r="12" fill="#d8e1d1"/></g>'+
 '<text x="210" y="94" class="campus-type" text-anchor="middle">COLLEGE CANTEEN</text></svg>';
 function student(i) {
  const colors=['#d3a16b','#8ba48c','#a99bab'],complexion=['#c78355','#a86849','#d29569'];
  const hair=[
   'M59 65Q54 28 88 23Q123 15 136 45L131 67 121 53Q92 57 69 48Z',
   'M59 65Q46 40 66 27Q69 14 89 21Q109 11 123 28Q143 36 134 63L124 53 109 55 92 46 71 56Z',
   'M57 64Q48 34 80 24Q111 20 134 38L134 64 123 55 116 38Q98 56 64 52Z'
  ];
  return '<svg viewBox="0 0 194 208" aria-label="College student '+(i+1)+'"><g stroke="#364741" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">'+
   '<path d="M19 190Q23 149 71 138L92 135 118 137Q167 145 178 190Z" fill="'+colors[i]+'"/>'+
   '<path d="M79 128v17q15 18 34 0v-17" fill="'+complexion[i]+'"/>'+
   '<path d="M63 63Q53 61 55 77Q56 87 66 88L68 102Q76 129 100 132Q123 129 131 99L134 85Q145 86 145 73Q142 62 135 66L133 51Q121 28 95 31Q68 35 64 55Z" fill="'+complexion[i]+'"/>'+
   '<path d="'+hair[i]+'" fill="#24332d"/><path d="M77 70h8m26 0h8m-21 5-3 13h6m-12 15q9 6 18-1" fill="none"/>'+
   (i===1?'<path d="M71 65h22v16H71zm33 0h22v16h-22zM93 73h11" fill="none"/>' : '')+
   '<path d="M70 142l24 17 22-17M54 184l7-23m74 23-7-23" fill="none"/></g></svg>';
 }
 const scene=()=>'<div class="campus-scene" data-campus><div class="campus-building" data-campus-building>'+campus+'</div>'+
 '<div class="student-line">'+[0,1,2].map(i=>'<div class="student-actor" data-student>'+student(i)+'<span>?</span></div>').join('')+'</div>'+
 '<div class="table-edge"><span class="paper-receipt" data-opening-slip><i></i><i></i><i></i></span></div></div>';
 const vectorLine=(numbers,label)=>'<div class="demo-vector"><i>'+label+'</i>'+numbers.map(n=>'<b>'+String(n).replace('-','−')+'</b>').join('')+'</div>';
 const demos=()=>[
  '<div class="demo-board" data-demo="swap"><h3>Swap two rows</h3><div class="demo-pair">'+
    '<div data-demo-top>'+vectorLine([1,1,1,45],'R₁')+'</div><div data-demo-bottom>'+vectorLine([2,3,1,85],'R₂')+'</div></div></div>',
  '<div class="demo-board" data-demo="multiply"><h3>Multiply by a nonzero number</h3>'+vectorLine([1,1,1,45],'R₁')+
    '<span class="demo-action" data-demo-times>× 2</span><div data-demo-answer>'+vectorLine([2,2,2,90],'2R₁')+'</div></div>',
  '<div class="demo-board" data-demo="add"><h3>Add a multiple to another row</h3>'+vectorLine([2,3,1,85],'R₂')+
    vectorLine([-2,-2,-2,-90],'−2R₁')+'<div data-demo-answer>'+vectorLine([0,1,-1,-5],'New R₂')+'</div></div>'
 ].join('');
 return {scene,demos};
})();
