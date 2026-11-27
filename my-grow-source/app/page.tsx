'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { Sprout, ArrowRight, ArrowLeft, Plus, BookOpen, Compass, Flag, Search, FileText, FolderOpen, CalendarDays, Download, Check, ChevronUp, ChevronDown, Trash2, Copy, Printer, Save, PencilLine, SlidersHorizontal, X, Upload, ExternalLink } from 'lucide-react';
import { GrowMark } from './grow-illustrations';
import { categories, themes, modules as moduleCatalog, passportItems, initialConfig, generateUnit, validateUnit, makeId } from './studio-model.mjs';
import { sections, annualSections, htmlDocument, plainDocument, docxBytes, download } from './studio-export.mjs';
import './studio.css';
import './gallery.css';
import { GalleryArt } from './gallery-art';
const modules: Record<string, any> = moduleCatalog;
const KEY = 'my-grow-teacher-units-v1', DRAFT = 'my-grow-teacher-draft-v1';
const icons: any = { compass: Compass, flag: Flag, search: Search, book: BookOpen };
const tabs = [['plan', '単元計画'], ['lesson', '指導案'], ['worksheet', 'ワークシート'], ['passport', 'キャリア・パスポート']];
function Field({ label, value, onChange, rows = 2, type = 'text', min, max }: any) { const id = useId(); return <label className="mg-field" htmlFor={id}><span>{label}</span>{type === 'area' ? <textarea id={id} rows={rows} value={value} onChange={e => onChange(e.target.value)}/> : <input id={id} type={type} min={min} max={max} value={value} onChange={e => onChange(type === 'number' ? e.target.value === '' ? '' : Number(e.target.value) : e.target.value)}/>}</label>; }
function move(list: any[], i: number, delta: number) { const n = [...list], j = i + delta; if (j < 0 || j >= n.length)
    return n; [n[i], n[j]] = [n[j], n[i]]; return n; }
function Questions({ qs, onChange, edit }: any) { return <div className="mg-questions">{qs.map((q: any, i: number) => <div key={q.id} className="mg-question">{edit ? <><div className="mg-question-tools"><b>項目 {i + 1}</b><button disabled={i === 0} aria-label={'項目' + (i + 1) + 'を上へ'} onClick={() => onChange(move(qs, i, -1))}><ChevronUp size={16}/></button><button disabled={i === qs.length - 1} aria-label={'項目' + (i + 1) + 'を下へ'} onClick={() => onChange(move(qs, i, 1))}><ChevronDown size={16}/></button><button aria-label={'項目' + (i + 1) + 'を削除'} onClick={() => onChange(qs.filter((_: any, j: number) => i !== j))}><Trash2 size={16}/></button></div><Field label="質問・項目名" type="area" value={q.text} onChange={(v: string) => onChange(qs.map((x: any, j: number) => i === j ? { ...x, text: v } : x))}/><Field label="記入欄の行数" type="number" min={1} max={12} value={q.lines} onChange={(v: number) => onChange(qs.map((x: any, j: number) => i === j ? { ...x, lines: Math.max(1, Math.min(12, Number(v) || 1)) } : x))}/></> : <><h3>{i + 1}. {q.text}</h3><div className="mg-answer" style={{ height: q.lines * 28 }}/></>}</div>)}{edit && qs.length < 100 && <button className="mg-dashed" onClick={() => onChange([...qs, { id: makeId(), text: '新しい質問を入力してください。', lines: 4 }])}><Plus size={17}/>項目を追加</button>}</div>; }
export default function Studio() {
    const [view, setView] = useState('home'), [step, setStep] = useState(1), [config, setConfig] = useState<any>(initialConfig), [unit, setUnit] = useState<any>(null), [saved, setSaved] = useState<any[]>([]), [tab, setTab] = useState('plan'), [index, setIndex] = useState(0), [edit, setEdit] = useState(false), [scope, setScope] = useState('current'), [message, setMessage] = useState(''), [storage, setStorage] = useState(true), [ready, setReady] = useState(false), [search, setSearch] = useState(''), [annualIds, setAnnualIds] = useState<string[]>([]), [manualCopy, setManualCopy] = useState('');
    const file = useRef<HTMLInputElement>(null), timer = useRef<any>(null);
    function notify(s: string) { setMessage(s); clearTimeout(timer.current); timer.current = setTimeout(() => setMessage(''), 5500); }
    useEffect(() => { try {
        const list = JSON.parse(localStorage.getItem(KEY) || '[]');
        if (Array.isArray(list))
            setSaved(list.filter(validateUnit));
        const draft = JSON.parse(localStorage.getItem(DRAFT) || 'null');
        if (validateUnit(draft)) {
            setUnit(draft);
            setConfig(draft.config);
        }
    }
    catch {
        setStorage(false);
    } setReady(true); }, []);
    useEffect(() => { if (!ready || !unit)
        return; try {
        localStorage.setItem(DRAFT, JSON.stringify(unit));
    }
    catch {
        setStorage(false);
    } }, [unit, ready]);
    function nav(v: string) { setView(v); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    function cfg(k: string, v: any) { setConfig((c: any) => ({ ...c, [k]: v })); }
    function chooseTheme(id: string) { const t = themes.find((t: any) => t.id === id)!; setConfig((c: any) => ({ ...c, theme: t.id, category: t.cat, title: t.name, hours: t.hours, goal: t.cat === 'career' ? '自分のよさや関心を知り、情報を基に考え、これからの学びや生活につなげる。' : t.cat === 'event' ? '目標をもって活動に参加し、仲間との関わりや自分の変化を捉えて次の行動につなげる。' : t.cat === 'passport' ? 'これまでの経験と自分の変化を振り返り、これから取り組むことを具体的に考える。' : '身近な課題から問いをもち、情報を集めて整理・分析し、自分の考えを表現する。', selected: [...t.modules] })); }
    function start(cat: string) { const t = themes.find((t: any) => t.cat === cat) || themes.at(-1); chooseTheme(t!.id); setStep(1); nav('create'); }
    function generate() { if (unit && !confirm('今の下書きを新しい内容で作り直します。必要な編集内容は「単元を保存」またはバックアップしましたか？'))
        return; try {
        const u = generateUnit(config);
        setUnit(u);
        setConfig(u.config);
        setTab('plan');
        setIndex(0);
        setEdit(false);
        nav('workspace');
        notify('授業一式を作成しました。各タブで確認・編集できます。');
    }
    catch (e: any) {
        notify(e.message);
    } }
    function changeUnit(fn: any) { setUnit((u: any) => { const n = fn(u); return { ...n, config: { ...n.config, hours: n.lessons.length }, updated: new Date().toISOString() }; }); }
    function setLesson(k: string, v: any) { changeUnit((u: any) => ({ ...u, lessons: u.lessons.map((l: any, i: number) => i === index ? { ...l, [k]: v } : l) })); }
    function saveUnit() { if (!unit)
        return; const next = [{ ...unit, updated: new Date().toISOString() }, ...saved.filter(u => u.id !== unit.id)]; try {
        localStorage.setItem(KEY, JSON.stringify(next));
        setSaved(next);
        setStorage(true);
        notify('このブラウザに単元を保存しました。');
    }
    catch {
        setStorage(false);
        notify('保存できませんでした。バックアップをダウンロードしてください。');
    } }
    function loadUnit(u: any, duplicate = false) { if (unit && JSON.stringify(unit) !== JSON.stringify(u) && !confirm('現在の下書きを切り替えます。必要な編集内容は保存しましたか？'))
        return; const n = JSON.parse(JSON.stringify(u)); if (duplicate) {
        n.id = makeId();
        n.config.title += '（コピー）';
    } setUnit(n); setConfig(n.config); setTab('plan'); setIndex(0); setEdit(false); nav('workspace'); }
    function removeUnit(u: any) { if (!confirm('「' + u.config.title + '」を保存済みの一覧から削除しますか？'))
        return; const next = saved.filter(x => x.id !== u.id); try {
        localStorage.setItem(KEY, JSON.stringify(next));
        setSaved(next);
        setAnnualIds(a => a.filter(id => id !== u.id));
        notify('保存済みの一覧から削除しました。開いている下書きは残ります。');
    }
    catch {
        notify('削除できませんでした。');
    } }
    const lesson = unit?.lessons[index];
    const annualUnits = saved.filter(u => annualIds.includes(u.id)).sort((a, b) => a.config.term.localeCompare(b.config.term, 'ja'));
    function getSections() { if (view === 'annual')
        return annualSections(annualUnits); return sections(unit, scope === 'all' ? 'all' : scope === 'set' ? 'set' : tab, index); }
    function exportWord() { const ss = getSections(); download(docxBytes(ss), (view === 'annual' ? '年間計画' : unit.config.title) + '_' + (scope === 'all' ? '一式' : view === 'annual' ? '' : tabs.find(t => t[0] === tab)?.[1] || '授業セット') + '.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'); notify('編集できるWordファイルをダウンロードしました。'); }
    function printPDF() { const w = window.open('', '_blank'); if (!w) {
        notify('印刷画面を開けませんでした。ブラウザのポップアップ設定を確認してください。');
        return;
    } w.document.write('<!doctype html><html lang="ja"><head><meta charset="utf-8"><title>My Grow 印刷用</title><style>@page{size:A4;margin:16mm}body{max-width:180mm;margin:24px auto}h1,h2{break-after:avoid}tr{break-inside:avoid}section:last-child{break-after:auto!important}@media print{.print-tools{display:none}body{margin:0}}.print-tools{padding:16px;background:#edf4f0;margin-bottom:24px;font-family:sans-serif}button{padding:10px}</style></head><body><div class="print-tools"><button onclick="window.print()">印刷・PDFとして保存</button><p>印刷先で「PDFに保存」を選べます。学校名や記入欄を確認してから印刷してください。</p></div>' + htmlDocument(getSections()) + '</body></html>'); w.document.close(); w.focus(); }
    async function copyOneNote() { const ss = getSections(), html = htmlDocument(ss), text = plainDocument(ss); try {
        if (navigator.clipboard?.write && typeof ClipboardItem !== 'undefined')
            await navigator.clipboard.write([new ClipboardItem({ 'text/html': new Blob([html], { type: 'text/html' }), 'text/plain': new Blob([text], { type: 'text/plain' }) })]);
        else if (navigator.clipboard?.writeText)
            await navigator.clipboard.writeText(text);
        else
            throw Error();
        notify('コピーしました。OneNoteのページに貼り付けて編集できます。');
    }
    catch {
        setManualCopy(text);
        notify('自動コピーが使えないため、コピー用テキストを表示しました。');
    } }
    function backup() { download(JSON.stringify({ schema: 1, units: saved, draft: unit }, null, 2), 'MyGrow_教材バックアップ.json', 'application/json'); }
    async function importBackup(e: any) { const f = e.target.files?.[0]; if (!f)
        return; try {
        if (f.size > 5000000)
            throw Error('ファイルが大きすぎます（5MBまで）。');
        const data = JSON.parse(await f.text());
        if (data.schema !== 1 || !Array.isArray(data.units) || !data.units.every(validateUnit) || (data.draft && !validateUnit(data.draft)))
            throw Error('My Growの教材バックアップを選んでください。');
        const list = [...saved];
        for (const u of data.units) {
            const n = JSON.parse(JSON.stringify(u));
            if (list.some(x => x.id === n.id))
                n.id = makeId();
            list.push(n);
        }
        if (data.draft) {
            const n = JSON.parse(JSON.stringify(data.draft));
            n.id = makeId();
            list.push(n);
        }
        localStorage.setItem(KEY, JSON.stringify(list));
        setSaved(list);
        setStorage(true);
        notify('バックアップを取り込みました。同じIDの単元は別の単元として追加しています。');
        nav('saved');
    }
    catch (err: any) {
        notify(err.message || '取り込みに失敗しました。');
    } e.target.value = ''; }
    function finishSharedDevice() {
        if (!confirm('この端末の保存済み単元と下書きをすべて削除して終了します。必要な資料は先にバックアップしてください。続けますか？'))
            return;
        try {
            localStorage.removeItem(KEY);
            localStorage.removeItem(DRAFT);
            window.location.reload();
        } catch {
            notify('データを削除できませんでした。ブラウザーの設定を確認してください。');
        }
    }
    const actionBar = <div className="mg-export"><label>出力する資料<select aria-label="出力する資料" value={scope} onChange={e => setScope(e.target.value)}><option value="current">表示中の資料</option>{['lesson', 'worksheet'].includes(tab) && <option value="set">この時間の授業セット</option>}<option value="all">授業一式すべて</option></select></label><button onClick={printPDF}><Printer size={16}/>印刷・PDF保存</button><button onClick={exportWord}><Download size={16}/>Wordで編集</button><button onClick={copyOneNote}><Copy size={16}/>OneNote用コピー</button></div>;
    return <div className="mg-studio"><aside className="mg-sidebar"><a href="#" className="mg-brand" onClick={e => { e.preventDefault(); nav('home'); }}><GrowMark /><span><b className="mg-wordmark">My<span>G</span>row</b><small>先生のための教材づくり</small></span></a><p className="mg-navlabel">TEACHING STUDIO</p><nav>{[['home', 'ホーム', Sprout], ['create', '単元を作る', Plus], ['saved', '保存した単元', FolderOpen], ['annual', '年間計画', CalendarDays]].map(([v, label, Icon]: any) => <button key={v} className={view === v ? 'active' : ''} onClick={() => { if (v === 'create')
        setStep(1); if (v === 'annual')
        setAnnualIds(saved.map(u => u.id)); nav(v); }}><Icon size={19}/>{label}{v === 'saved' && <small>{saved.length}</small>}</button>)}{unit && <button className={view === 'workspace' ? 'active' : ''} onClick={() => nav('workspace')}><FileText size={19}/>編集中の単元</button>}</nav><button className="mg-text" onClick={finishSharedDevice}>共用端末：データを消して終了</button></aside><div className="mg-main"><main id="studio-main">
 {!storage && <p className="mg-warning">端末に保存できない状態です。編集した資料はWordまたはバックアップで取り出してください。</p>}
 {view === 'home' && <><section className="mg-home-heading"><div className="mg-home-copy"><p className="mg-eyebrow">MY GROW / TEACHING STUDIO</p><h1>授業の教材を<span>作る<span className="mg-title-dot">.</span></span></h1><p>学習・行事を選んで、計画・指導案・ワークシートをまとめて作成。</p></div><GalleryArt variant={4}/></section><section className="mg-start-section" aria-label="学習・行事を選ぶ"><div className="mg-categories">{categories.map((cat: any, i: number) => <button key={cat.id} className="mg-category" onClick={() => start(cat.id)}><span className="mg-category-number" aria-hidden="true">0{i + 1}</span><div className="mg-category-copy"><h2>{cat.title}</h2><p>{cat.sub}</p><span className="mg-category-bottom">教材を作る<ArrowRight size={17}/></span></div><GalleryArt variant={i}/></button>)}</div><button className="mg-text mg-custom-start" onClick={() => start('custom')}><Plus size={17}/>自分で単元を作る</button></section>{unit && <section className="mg-resume"><div><span className="mg-small">編集中の単元</span><h3>{unit.config.title}</h3><p>{unit.config.school} {unit.config.grade}・全{unit.lessons.length}時間</p></div><button onClick={() => nav('workspace')}>続きから編集<ArrowRight size={17}/></button></section>}<details className="mg-home-info"><summary>教材について・参考資料</summary><p>My Grow独自のひな形を、学校の目標や所定の様式に合わせて編集できます。</p><a href="https://www.mext.go.jp/a_menu/shotou/career/detail/1419917.htm" target="_blank" rel="noopener noreferrer">文部科学省「キャリア・パスポート」例示資料等</a></details></>}
 {view === 'create' && <><div className="mg-page-heading"><p className="mg-eyebrow">CREATE A TEACHING UNIT</p><h1>選ぶだけで、授業のかたちに。</h1><p>おすすめ項目をそのまま使っても、学校に合わせて選び直しても。</p></div><div className="mg-stepper">{['基本を決める', '学習項目を選ぶ', '確認して作成'].map((s, i) => <button key={s} className={step === i + 1 ? 'active' : ''} onClick={() => setStep(i + 1)}><span>{i + 1}</span>{s}</button>)}</div><div className="mg-builder-grid"><section className="mg-panel">{step === 1 ? <><h2>01 単元の基本</h2><label className="mg-field"><span>学習・行事のテーマ</span><select value={config.theme} onChange={e => chooseTheme(e.target.value)}>{categories.map(cat => <optgroup key={cat.id} label={cat.title}>{themes.filter(t => t.cat === cat.id).map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</optgroup>)}<option value="custom">自分で単元を作る</option></select></label><Field label="単元名（変更できます）" value={config.title} onChange={(v: string) => cfg('title', v)}/><div className="mg-field-grid"><label className="mg-field"><span>校種</span><select value={config.school} onChange={e => { cfg('school', e.target.value); cfg('grade', e.target.value === '小学校' ? '5年' : '2年'); cfg('minutes', e.target.value === '小学校' ? 45 : 50); }}>{['小学校', '中学校', '高等学校'].map(x => <option key={x}>{x}</option>)}</select></label><label className="mg-field"><span>学年</span><select value={config.grade} onChange={e => cfg('grade', e.target.value)}>{Array.from({ length: config.school === '小学校' ? 6 : 3 }, (_, i) => <option key={i}>{i + 1}年</option>)}</select></label><Field label="授業時数（1〜35時間）" type="number" min={1} max={35} value={config.hours} onChange={(v: number) => cfg('hours', v)}/><Field label="1時間の長さ（20〜120分）" type="number" min={20} max={120} value={config.minutes} onChange={(v: number) => cfg('minutes', v)}/></div><div className="mg-field-grid"><label className="mg-field"><span>実施時期</span><select value={config.term} onChange={e => cfg('term', e.target.value)}>{['1学期', '2学期', '3学期', '前期', '後期', '通年'].map(t => <option key={t}>{t}</option>)}</select></label><Field label="学校名（任意）" value={config.schoolName} onChange={(v: string) => cfg('schoolName', v)}/></div><Field label="単元の目標（変更できます）" type="area" rows={3} value={config.goal} onChange={(v: string) => cfg('goal', v)}/></> : step === 2 ? <><h2>02 入れたい学習を選ぶ</h2><p>選んだ内容を各時間に配分します。順番や発問は作成後も変更できます。</p><div className="mg-module-grid">{Object.entries(modules).map(([id, m]: any) => <label className={'mg-check-card ' + (config.selected.includes(id) ? 'checked' : '')} key={id}><input type="checkbox" checked={config.selected.includes(id)} onChange={() => cfg('selected', config.selected.includes(id) ? config.selected.filter((s: string) => s !== id) : [...config.selected, id])}/><span><b>{m.name}</b><small>{m.goal}</small></span></label>)}</div><h3>選んだ学習の順番</h3><p>この順に各時間へ配置します。矢印で変更できます。</p><div className="mg-selected-order">{config.selected.map((id: string, i: number) => <div key={id}><span>{i + 1}. {modules[id].name}</span><button aria-label={modules[id].name + 'を上へ'} disabled={i === 0} onClick={() => cfg('selected', move(config.selected, i, -1))}><ChevronUp size={16}/></button><button aria-label={modules[id].name + 'を下へ'} disabled={i === config.selected.length - 1} onClick={() => cfg('selected', move(config.selected, i, 1))}><ChevronDown size={16}/></button></div>)}</div></> : <><h2>03 振り返り・出力の設定</h2><label className="mg-toggle"><input type="checkbox" checked={config.passport} onChange={e => cfg('passport', e.target.checked)}/><span><b>キャリア・パスポートも作る</b><small>この単元の目標に対応した、目標と振り返りのシートを作成します。</small></span></label>{config.passport && <div className="mg-pass-checks">{passportItems.map(([id, text]) => <label key={id}><input type="checkbox" checked={config.passportSelected.includes(id)} onChange={() => cfg('passportSelected', config.passportSelected.includes(id) ? config.passportSelected.filter((s: string) => s !== id) : [...config.passportSelected, id])}/>{text}</label>)}</div>}<label className="mg-toggle"><input type="checkbox" checked={config.support} onChange={e => cfg('support', e.target.checked)}/><span><b>指導案に支援・配慮の例を入れる</b><small>書くことが苦手な子への支援や、参加方法の工夫など。</small></span></label><label className="mg-field"><span>ワークシートの記入欄</span><select value={config.lines} onChange={e => cfg('lines', Number(e.target.value))}><option value={3}>コンパクト：3行</option><option value={4}>標準：4行</option><option value={6}>ゆったり：6行</option></select></label><div className="mg-summary-list"><p><Check size={17}/>単元計画　1点</p><p><Check size={17}/>指導案・ワークシート　各{Math.max(1, Number(config.hours) || 1)}時間分</p>{config.passport && <p><Check size={17}/>キャリア・パスポート　1点</p>}</div></>}<div className="mg-builder-actions"><button onClick={() => step > 1 ? setStep(step - 1) : nav('home')}><ArrowLeft size={16}/>{step > 1 ? '戻る' : 'ホームへ'}</button>{step < 3 ? <button className="mg-primary" disabled={!config.title.trim() || !config.goal.trim() || !config.selected.length} onClick={() => setStep(step + 1)}>次へ<ArrowRight size={16}/></button> : <button className="mg-primary" disabled={!config.title.trim() || !config.goal.trim() || !config.selected.length || (config.passport && !config.passportSelected.length)} onClick={generate}><Sprout size={17}/>授業一式を作る</button>}</div></section><aside className="mg-build-summary"><p className="mg-eyebrow">YOUR UNIT</p><h3>{config.title || '新しい単元'}</h3><p>{config.school} {config.grade}・{config.term}</p><div className="mg-hour-count"><b>{Math.max(1, Number(config.hours) || 1)}</b><span>時間 × {config.minutes || 50}分</span></div><hr /><b>選択した学習</b><ul>{config.selected.map((id: string) => <li key={id}>{modules[id].name}</li>)}</ul>{config.selected.length > Number(config.hours) * 2 && <p className="mg-warning">1時間に複数の活動が入ります。時数を増やすか項目を減らすと、じっくり取り組めます。</p>}<p className="mg-small">時数が多い場合は、調べ学習などの継続時間を配置します。体験当日の長さは学校の計画に合わせて調整できます。</p></aside></div></>}
 {view === 'workspace' && unit && <><div className="mg-page-heading mg-work-heading"><div><p className="mg-eyebrow">YOUR TEACHING MATERIALS</p><h1>{unit.config.title}</h1><p>{unit.config.school} {unit.config.grade} ／ {unit.config.term} ／ 全{unit.lessons.length}時間<span className="mg-autosave">{storage ? '下書きを自動保存' : '下書きを保存できません'}</span></p></div><div><button onClick={() => { setConfig(unit.config); setStep(1); nav('create'); }}><SlidersHorizontal size={16}/>設定から作り直す</button><button className="mg-primary" onClick={saveUnit}><Save size={17}/>単元を保存</button></div></div><div className="mg-doc-tabs" role="tablist" aria-label="授業資料">{tabs.filter(t => t[0] !== 'passport' || unit.passport.length).map(([id, label]) => <button key={id} role="tab" aria-selected={tab === id} className={tab === id ? 'active' : ''} onClick={() => { setTab(id); setScope('current'); }}>{label}</button>)}</div>{actionBar}<div className="mg-editor-toolbar"><div>{['lesson', 'worksheet'].includes(tab) && <label>授業を選ぶ<select aria-label="授業を選ぶ" value={index} onChange={e => setIndex(Number(e.target.value))}>{unit.lessons.map((l: any, i: number) => <option value={i} key={l.id}>第{i + 1}時：{l.title}</option>)}</select></label>}</div><button className={edit ? 'mg-primary' : ''} onClick={() => setEdit(!edit)}>{edit ? <Check size={16}/> : <PencilLine size={16}/>} {edit ? '編集を終える' : '内容を編集する'}</button></div><article className={'mg-paper ' + (edit ? 'editing' : '')}>
 {tab === 'plan' ? <><p className="mg-doc-eyebrow">UNIT PLAN</p>{edit ? <Field label="単元名" value={unit.config.title} onChange={(v: string) => changeUnit((u: any) => ({ ...u, config: { ...u.config, title: v } }))}/> : <h2>{unit.config.title} 単元計画</h2>}<p className="mg-doc-meta">{unit.config.schoolName} {unit.config.school} {unit.config.grade} ／ {unit.config.term} ／ 1時間 {unit.config.minutes}分</p>{edit && <div className="mg-field-grid"><Field label="学校名" value={unit.config.schoolName || ''} onChange={(v: string) => changeUnit((u: any) => ({ ...u, config: { ...u.config, schoolName: v } }))}/><label className="mg-field"><span>実施時期</span><select value={unit.config.term} onChange={e => changeUnit((u: any) => ({ ...u, config: { ...u.config, term: e.target.value } }))}>{['1学期', '2学期', '3学期', '前期', '後期', '通年'].map(t => <option key={t}>{t}</option>)}</select></label></div>}{edit ? <Field label="単元の目標" type="area" rows={3} value={unit.config.goal} onChange={(v: string) => changeUnit((u: any) => ({ ...u, config: { ...u.config, goal: v } }))}/> : <div className="mg-goal"><b>単元の目標</b><p>{unit.config.goal}</p></div>}<h3>学習の流れ</h3><div className="mg-plan-list">{unit.lessons.map((l: any, i: number) => <div className="mg-plan-row" key={l.id}><span className="mg-lesson-number">第{i + 1}時</span><div><b>{l.title}</b><p>{l.goal}</p></div>{edit ? <div className="mg-plan-controls"><button aria-label={'第' + (i + 1) + '時を上へ'} disabled={i === 0} onClick={() => changeUnit((u: any) => ({ ...u, lessons: move(u.lessons, i, -1) }))}><ChevronUp size={16}/></button><button aria-label={'第' + (i + 1) + '時を下へ'} disabled={i === unit.lessons.length - 1} onClick={() => changeUnit((u: any) => ({ ...u, lessons: move(u.lessons, i, 1) }))}><ChevronDown size={16}/></button><button aria-label={'第' + (i + 1) + '時を削除'} disabled={unit.lessons.length === 1} onClick={() => { if (confirm('この時間の指導案とワークシートを削除しますか？')) {
            changeUnit((u: any) => ({ ...u, lessons: u.lessons.filter((_: any, j: number) => j !== i) }));
            setIndex(0);
        } }}><Trash2 size={16}/></button></div> : <button aria-label={'第' + (i + 1) + '時の指導案を開く'} onClick={() => { setIndex(i); setTab('lesson'); }}><ArrowRight size={18}/></button>}</div>)}</div>{edit && unit.lessons.length < 35 && <button className="mg-dashed" onClick={() => changeUnit((u: any) => { const l = generateUnit({ ...u.config, hours: 1, selected: ['research'] }).lessons[0]; return { ...u, lessons: [...u.lessons, l] }; })}><Plus size={16}/>1時間追加する</button>}<p className="mg-small">学習内容・発問・見取りは、各時間の「指導案」「ワークシート」タブから編集できます。</p></> : tab === 'lesson' ? <><p className="mg-doc-eyebrow">LESSON PLAN / {index + 1}</p>{edit ? <Field label="本時の題名" value={lesson.title} onChange={(v: string) => setLesson('title', v)}/> : <h2>第{index + 1}時　{lesson.title}</h2>}{[['goal', '本時の目標'], ['prep', '準備物']].map(([k, label]) => edit ? <Field key={k} label={label} type="area" value={lesson[k]} onChange={(v: string) => setLesson(k, v)}/> : <div key={k} className={k === 'goal' ? 'mg-goal' : 'mg-text-block'}><b>{label}</b><p>{lesson[k]}</p></div>)}<div className="mg-section-head"><h3>授業の展開</h3><span>計 {lesson.phases.reduce((s: number, p: any) => s + Number(p.minutes), 0)} / {unit.config.minutes}分</span></div>{lesson.phases.reduce((s: number, p: any) => s + Number(p.minutes), 0) !== unit.config.minutes && <p className="mg-warning">時間配分の合計が1時間の長さと一致していません。編集で調整してください。</p>}<div className="mg-phases">{lesson.phases.map((p: any, i: number) => <div className="mg-phase" key={p.id}>{edit ? <><div className="mg-field-grid"><Field label="活動名" value={p.name} onChange={(v: string) => setLesson('phases', lesson.phases.map((x: any, j: number) => i === j ? { ...x, name: v } : x))}/><Field label="時間（分）" type="number" min={0} max={120} value={p.minutes} onChange={(v: number) => setLesson('phases', lesson.phases.map((x: any, j: number) => i === j ? { ...x, minutes: Math.max(0, Math.min(120, Number(v) || 0)) } : x))}/></div><Field label="学習活動" type="area" rows={3} value={p.activity} onChange={(v: string) => setLesson('phases', lesson.phases.map((x: any, j: number) => i === j ? { ...x, activity: v } : x))}/><Field label="主な発問" type="area" value={p.prompt} onChange={(v: string) => setLesson('phases', lesson.phases.map((x: any, j: number) => i === j ? { ...x, prompt: v } : x))}/><div className="mg-inline-actions"><button aria-label={'活動' + (i + 1) + 'を上へ'} disabled={i === 0} onClick={() => setLesson('phases', move(lesson.phases, i, -1))}><ChevronUp size={16}/></button><button aria-label={'活動' + (i + 1) + 'を下へ'} disabled={i === lesson.phases.length - 1} onClick={() => setLesson('phases', move(lesson.phases, i, 1))}><ChevronDown size={16}/></button><button onClick={() => setLesson('phases', lesson.phases.filter((_: any, j: number) => i !== j))}><Trash2 size={16}/>活動を削除</button></div></> : <><span className="mg-phase-time">{p.minutes}<small>分</small></span><div><h4>{p.name}</h4><p>{p.activity}</p><blockquote>{p.prompt}</blockquote></div></>}</div>)}</div>{edit && <button className="mg-dashed" onClick={() => setLesson('phases', [...lesson.phases, { id: makeId(), name: '新しい活動', minutes: 5, activity: '', prompt: '' }])}><Plus size={16}/>活動を追加</button>}{[['support', '支援・配慮'], ['assessment', '見取りの視点'], ['note', '先生のメモ']].map(([k, label]) => edit ? <Field key={k} label={label} type="area" value={lesson[k]} onChange={(v: string) => setLesson(k, v)}/> : lesson[k] && <div key={k} className="mg-text-block"><h3>{label}</h3><p>{lesson[k]}</p></div>)}</> : tab === 'worksheet' ? <><p className="mg-doc-eyebrow">WORKSHEET / {index + 1}</p><h2>第{index + 1}時　{lesson.title}</h2><p className="mg-name-line">年　　組　　番　名前　　　　　　　　　　　日付　　月　　日</p><div className="mg-goal"><b>今日のめあて</b><p>{lesson.goal}</p></div><Questions edit={edit} qs={lesson.questions} onChange={(q: any) => setLesson('questions', q)}/></> : <><p className="mg-doc-eyebrow">CAREER PASSPORT</p><h2>{unit.config.title}<br />キャリア・パスポート</h2><p className="mg-name-line">年　　組　　番　名前　　　　　　　　　　　記入日　　月　　日</p><div className="mg-goal"><b>学習・活動の目標</b><p>{unit.config.goal}</p></div><Questions edit={edit} qs={unit.passport} onChange={(q: any) => changeUnit((u: any) => ({ ...u, passport: q }))}/><p className="mg-small">学校のキャリア・パスポートの運用に合わせて、残す記録やコメント欄を調整してください。</p></>}
 </article><p className="mg-small mg-under-paper">変更はこのブラウザの下書きに保存されます。再利用する場合は「単元を保存」、端末を変える場合は「バックアップ」を使ってください。</p></>}
 {view === 'saved' && <><div className="mg-page-heading"><p className="mg-eyebrow">YOUR TEMPLATE LIBRARY</p><h1>保存した単元</h1><p>学校に合わせて育てた教材を、次の授業にも。</p></div><div className="mg-library-tools"><label className="mg-search"><Search size={18}/><input placeholder="単元名・学校・学年で検索" value={search} onChange={e => setSearch(e.target.value)}/></label><button onClick={backup}><Download size={16}/>バックアップ</button><button onClick={() => file.current?.click()}><Upload size={16}/>取り込む</button></div>{!saved.length ? <div className="mg-empty"><FolderOpen size={42}/><h2>最初の単元を保存しましょう</h2><p>作成画面で「単元を保存」を押すと、ここに並びます。</p><button className="mg-primary" onClick={() => start('career')}>単元を作る<ArrowRight size={17}/></button></div> : <div className="mg-saved-grid">{saved.filter(u => (u.config.title + u.config.school + u.config.grade).includes(search)).map(u => <section className="mg-saved-card" key={u.id}><span className="mg-pill">{u.config.school} {u.config.grade}</span><h2>{u.config.title}</h2><p>{u.config.term}・全{u.lessons.length}時間</p><p className="mg-small">更新：{new Date(u.updated).toLocaleString('ja-JP')}</p><div><button className="mg-primary" onClick={() => loadUnit(u)}>開く<ArrowRight size={16}/></button><button onClick={() => loadUnit(u, true)}><Copy size={16}/>複製</button><button aria-label={u.config.title + 'を削除'} onClick={() => removeUnit(u)}><Trash2 size={16}/></button></div></section>)}</div>}<p className="mg-storage-note">保存先は今使っている端末・ブラウザです。端末の変更やブラウザのデータ削除に備え、バックアップをダウンロードしておくと安心です。</p></>}
 {view === 'annual' && <><div className="mg-page-heading"><p className="mg-eyebrow">CONNECT YOUR UNITS</p><h1>年間の学びを見渡す。</h1><p>保存した単元を選んで、学期ごとの計画にまとめます。</p></div>{!saved.length ? <div className="mg-empty"><CalendarDays size={40}/><h2>まずは単元を保存してください</h2><button className="mg-primary" onClick={() => start('career')}>単元を作る</button></div> : <><section className="mg-panel"><h2>年間計画に入れる単元</h2><div className="mg-annual-choices">{saved.map(u => <label key={u.id}><input type="checkbox" checked={annualIds.includes(u.id)} onChange={() => setAnnualIds(ids => ids.includes(u.id) ? ids.filter(id => id !== u.id) : [...ids, u.id])}/>{u.config.title} <small>{u.config.school} {u.config.grade}・{u.config.term}・{u.lessons.length}時間</small></label>)}</div></section><div className="mg-export"><span>選択した単元：計 {annualUnits.reduce((s, u) => s + u.lessons.length, 0)}時間</span><button disabled={!annualUnits.length} onClick={printPDF}><Printer size={16}/>印刷・PDF保存</button><button disabled={!annualUnits.length} onClick={exportWord}><Download size={16}/>Wordで編集</button><button disabled={!annualUnits.length} onClick={copyOneNote}><Copy size={16}/>OneNote用コピー</button></div><article className="mg-paper" dangerouslySetInnerHTML={{ __html: htmlDocument(annualSections(annualUnits)) }}/></>}</>}
 <footer className="mg-footer"><span>My Grow — 学びの準備を、もっと身近に。</span><button onClick={backup}><Download size={14}/>バックアップ</button></footer>
 </main></div><input ref={file} type="file" accept="application/json,.json" hidden onChange={importBackup}/>{message && <div role="status" className="mg-toast"><Check size={18}/>{message}<button aria-label="通知を閉じる" onClick={() => setMessage('')}><X size={16}/></button></div>}{manualCopy && <div className="mg-modal-backdrop"><section className="mg-modal" role="dialog" aria-modal="true" aria-label="OneNote用テキスト"><h2>OneNote用テキスト</h2><p>下のテキストを選択・コピーして貼り付けてください。</p><textarea readOnly value={manualCopy} onFocus={e => e.target.select()} aria-label="コピーするテキスト"/><button onClick={() => setManualCopy('')}>閉じる</button></section></div>}</div>;
}
