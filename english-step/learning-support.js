(()=>{
const E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
window.simpleLearningText=s=>String(s||'').replace(/想定される反対意見/g,'違う考え').replace(/引用と要約の区別/g,'相手の言葉と、自分でまとめた文を分けよう').replace(/立場/g,'自分の考え').replace(/論題/g,'話し合うテーマ').replace(/結末/g,'おわり').replace(/転機/g,'変わるきっかけ').replace(/架空名可/g,'想像した名前でもOK').replace(/示せる記録/g,'見せられる記録').replace(/確認済み/g,'確かめた').replace(/折り合える案/g,'みんながよいと思える案');
window.simpleLearningGoal=s=>String(s||'').replace(/【独自補充目標】/g,'').replace(/。教科書の固有の人物・史実の説明は含みません。/g,'').trim();
window.learningGoalHTML=(goal,items)=>`<section class="learning-goal"><div class="eyebrow">START</div><h2>Goal｜めあて</h2><p class="learning-goal-text">${E(window.simpleLearningGoal(goal))}</p><h3>Can-Do｜できるようになること</h3><ul class="learning-cando">${items.map(x=>`<li><span aria-hidden="true">✓</span><span>${E(x)}</span></li>`).join('')}</ul></section>`;
// Original small SVG drawings. Abstract vocabulary uses examples rather than a misleading picture.
const icons={
umbrella:'<path d="M4 13a8 8 0 0 1 16 0H4m8-9v14a3 3 0 0 0 6 0"/>',
clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
light:'<path d="M8 15a6 6 0 1 1 8 0l-1 3H9zM9 21h6M12 1v2M2 10h2M20 10h2"/>',
photograph:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8" cy="9" r="2"/><path d="m4 18 5-5 3 3 4-5 4 7"/>',
river:'<path d="M7 2c12 4-9 7 3 11s-2 7 5 9M13 2c12 4-9 7 3 11s-2 7 5 9"/>',
notebook:'<rect x="5" y="3" width="15" height="18" rx="2"/><path d="M8 3v18M3 7h4M3 12h4M3 17h4M11 8h6M11 12h5"/>',
energy:'<path d="m14 2-9 12h7l-2 8 9-12h-7z"/>',
electricity:'<path d="m14 2-9 12h7l-2 8 9-12h-7z"/>',
artist:'<path d="M12 3a9 9 0 1 0 0 18h2a2 2 0 0 0 0-4h-1a2 2 0 0 1 0-4h3c7 0 3-10-4-10z"/><circle cx="7" cy="10" r="1"/><circle cx="11" cy="7" r="1"/><circle cx="16" cy="8" r="1"/>',
north:'<path d="M12 21V5m-5 5 5-5 5 5"/><text x="4" y="6" stroke="none" fill="currentColor" font-size="6">N</text>',
east:'<path d="M3 12h16m-5-5 5 5-5 5"/><text x="16" y="5" stroke="none" fill="currentColor" font-size="6">E</text>',
entrance:'<path d="M13 21h8V3h-8M12 12H2m5-5 5 5-5 5"/>',
leg:'<path d="M10 3v8l-2 9h9v-3h-5l3-6V3"/>',
snow:'<path d="M12 2v20M3 7l18 10M3 17 21 7M8 4l4 4 4-4M8 20l4-4 4 4"/>',
lantern:'<path d="M8 6V4a4 4 0 0 1 8 0v2M7 7h10l2 13H5zM10 10v7m4-7v7M5 22h14"/>',
hut:'<path d="m2 12 10-9 10 9H2m3 0v9h14v-9M10 21v-7h4v7"/>',
bell:'<path d="M5 17h14l-2-4V9a5 5 0 0 0-10 0v4zM10 20a2 2 0 0 0 4 0M12 2v2"/>',
lighthouse:'<path d="m9 7-3 14h12L15 7zM8 7h8V3H8zM1 3l4 2-4 2m22-4-4 2 4 2M8 15h8M9 11h6"/>',
sparrow:'<path d="M5 15c0-5 2-9 6-9 2 0 3 2 3 4l5 2-5 2c-2 4-6 5-10 3l-2-4zM8 18v3m4-4v4"/><circle cx="11" cy="9" r=".5"/>',
gate:'<path d="M3 3v18M21 3v18M3 7h18M3 17h18M7 7v10m5-10v10m5-10v10"/>',
rope:'<path d="M5 3c12 0 14 8 6 9S2 21 19 21M6 2l-2 3m5-2-1 3m5-2-2 3m4 0-2 2m0 4-1 3m-5-1 1 3m5 1-1 3"/>',
instrument:'<path d="M10 15V4l10-2v11M10 7l10-2"/><ellipse cx="6" cy="17" rx="4" ry="3"/><ellipse cx="16" cy="15" rx="4" ry="3"/>',
leaf:'<path d="M20 3C5 1 1 13 7 18S22 15 20 3zM4 22l12-14"/>',
roof:'<path d="m2 13 10-10 10 10M5 13v8h14v-8"/>',
basket:'<path d="M3 10h18l-3 11H6zM7 10l5-8 5 8M9 13v5m6-5v5"/>',
library:'<path d="M3 21V7l9-5 9 5v14M1 21h22M7 10v8m5-8v8m5-8v8"/>',
present:'<rect x="3" y="9" width="18" height="12"/><path d="M2 6h20v4H2zM12 6v15M12 6C2 7 5-4 12 6c7-10 10 1 0 0"/>',
ticket:'<path d="M2 7h20v4a2 2 0 0 0 0 4v4H2v-4a2 2 0 0 0 0-4zM16 8v2m0 2v2m0 2v2"/>',
tap:'<path d="M3 9h11a5 5 0 0 1 5 5v2h-5v-2H3zM9 9V5m-4 0h8M17 18s-4 5 0 5 0-5 0-5"/>',
runner:'<circle cx="15" cy="4" r="2"/><path d="m11 7 5 4 4-2M11 7l-4 5-4-1m8-4 2 8-5 6m5-6 5 6"/>',
robot:'<rect x="4" y="6" width="16" height="14" rx="3"/><path d="M12 2v4M2 10v6m20-6v6M8 16h8"/><circle cx="8" cy="11" r="1"/><circle cx="16" cy="11" r="1"/>',
sign:'<path d="M12 2v20M3 5h14l4 4-4 4H3z"/>',
seat:'<path d="M5 3h13v10H5zM3 13h17v4H3zM5 17v5m13-5v5"/>',
penguin:'<ellipse cx="12" cy="12" rx="7" ry="10"/><ellipse cx="12" cy="15" rx="4" ry="6"/><path d="m10 7 2 3 2-3M5 12l-3 5m17-5 3 5M7 22H4m13 0h3"/><circle cx="10" cy="5" r=".5"/><circle cx="14" cy="5" r=".5"/>'
};
icons.gift=icons.present;icons.image=icons.photograph;icons.display=icons.photograph;
window.learningWordPicture=word=>icons[word]?`<svg class="word-picture" viewBox="0 0 24 24" role="img" aria-label="${E(word)}のイラスト" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${icons[word]}</svg>`:'';
})();
