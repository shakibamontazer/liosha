(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,73327,e=>{"use strict";var t=e.i(29315);let o="ArrowUp",a="ArrowDown",n="ArrowLeft",r="ArrowRight",i="Home",l=new Set([o,a,n,r,i,"End"]);function s(e,t,o){let a="left"===o?"offsetLeft":"offsetTop",n=0;for(;t.offsetParent&&(n+=t[a],t.offsetParent!==e);)t=t.offsetParent;return n}function c(e){let t=getComputedStyle(e);return{scrollMarginTop:parseFloat(t.scrollMarginTop)||0,scrollMarginRight:parseFloat(t.scrollMarginRight)||0,scrollMarginBottom:parseFloat(t.scrollMarginBottom)||0,scrollMarginLeft:parseFloat(t.scrollMarginLeft)||0,scrollPaddingTop:parseFloat(t.scrollPaddingTop)||0,scrollPaddingRight:parseFloat(t.scrollPaddingRight)||0,scrollPaddingBottom:parseFloat(t.scrollPaddingBottom)||0,scrollPaddingLeft:parseFloat(t.scrollPaddingLeft)||0}}e.s(["ARROW_DOWN",0,a,"ARROW_LEFT",0,n,"ARROW_RIGHT",0,r,"ARROW_UP",0,o,"COMPOSITE_KEYS",0,l,"END",0,"End","HOME",0,i,"MODIFIER_KEYS",0,["Shift","Control","Alt","Meta"],"isNativeInput",0,function(e){return!!((0,t.isHTMLElement)(e)&&"INPUT"===e.tagName&&null!=e.selectionStart||(0,t.isHTMLElement)(e)&&"TEXTAREA"===e.tagName)},"scrollIntoViewIfNeeded",0,function(e,t,o,a){if(!e||!t||!t.scrollTo)return;let n=e.scrollLeft,r=e.scrollTop,i=e.clientWidth<e.scrollWidth,l=e.clientHeight<e.scrollHeight;if(i&&"vertical"!==a){let a=s(e,t,"left"),r=c(e),i=c(t);"ltr"===o&&(a+t.offsetWidth+i.scrollMarginRight>e.scrollLeft+e.clientWidth-r.scrollPaddingRight?n=a+t.offsetWidth+i.scrollMarginRight-e.clientWidth+r.scrollPaddingRight:a-i.scrollMarginLeft<e.scrollLeft+r.scrollPaddingLeft&&(n=a-i.scrollMarginLeft-r.scrollPaddingLeft)),"rtl"===o&&(a-i.scrollMarginLeft<e.scrollLeft+r.scrollPaddingLeft?n=a-i.scrollMarginLeft-r.scrollPaddingLeft:a+t.offsetWidth+i.scrollMarginRight>e.scrollLeft+e.clientWidth-r.scrollPaddingRight&&(n=a+t.offsetWidth+i.scrollMarginRight-e.clientWidth+r.scrollPaddingRight))}if(l&&"horizontal"!==a){let o=s(e,t,"top"),a=c(e),n=c(t);o-n.scrollMarginTop<e.scrollTop+a.scrollPaddingTop?r=o-n.scrollMarginTop-a.scrollPaddingTop:o+t.offsetHeight+n.scrollMarginBottom>e.scrollTop+e.clientHeight-a.scrollPaddingBottom&&(r=o+t.offsetHeight+n.scrollMarginBottom-e.clientHeight+a.scrollPaddingBottom)}e.scrollTo({left:n,top:r,behavior:"auto"})}])},91323,e=>{"use strict";var t=e.i(56420);let o={name:"badge-check",size:24,node:[["path",{d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",key:"3c2336"}],["path",{d:"m16 9-5.5 5.5L8 12",key:"xofnsj"}]],aliases:["verified"]};o.node;let a=(0,t.default)(o);e.s(["BadgeCheck",0,a],91323)},71567,e=>{"use strict";var t=e.i(56420);let o={name:"bot",size:24,node:[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]]};o.node;let a=(0,t.default)(o);e.s(["Bot",0,a],71567)},62979,e=>{"use strict";var t=e.i(56420);let o={name:"headset",size:24,node:[["path",{d:"M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z",key:"12oyoe"}],["path",{d:"M21 16v2a4 4 0 0 1-4 4h-5",key:"1x7m43"}]]};o.node;let a=(0,t.default)(o);e.s(["Headset",0,a],62979)},28623,e=>{"use strict";var t=e.i(56420);let o={name:"sparkles",size:24,node:[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],aliases:["stars"]};o.node;let a=(0,t.default)(o);e.s(["Sparkles",0,a],28623)},63676,e=>{"use strict";var t=e.i(14387);e.s(["X",()=>t.default])},18566,(e,t,o)=>{t.exports=e.r(76562)},24687,e=>{"use strict";var t=e.i(43476),o=e.i(79862);e.s(["Textarea",0,function({className:e,...a}){return(0,t.jsx)("textarea",{"data-slot":"textarea",className:(0,o.cn)("flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",e),...a})}])},43037,e=>{"use strict";var t=e.i(66393);function o(e,t=90){let a=e.replace(/\s+/g," ").trim();return a.length>t?`${a.slice(0,t)}…`:a}e.s(["answerConcern",0,function(e,t,a,n){let r=o(e,80),i=o(t,140),l=o(a,80);return"fa"===n?`موضوع: ${r}
زمینه: ${i||"زمینه کوتاه بود؛ با همین حد جواب می‌دهم."}
هدف خواسته‌شده: ${l||"یک متن قابل ارسال."}

پاسخ پیشنهادی:
\xabممنون که رک گفتید. تفاوت این پیشنهاد در دامنه خروجی است، نه در تعارف قیمت. اگر بودجه محدودتر است، همان کیفیت را در پکیج کوچک‌تر می‌دهم تا نتیجه خراب نشود. کدام بخش خروجی برایتان ضروری است؟\xbb

استراتژی: تخفیف نده مگر دامنه کار کم شود. سؤال آخر را باز بگذار تا مشتری انتخاب کند، نه اینکه مکالمه ببندد.`:`Topic: ${r}
Context: ${i||"The context was short, so this stays specific but compact."}
Asked outcome: ${l||"A message you can send."}

Suggested reply:
“Thank you for saying it plainly. The difference in this offer is the scope of the result, not a courtesy on the price. If the budget is tighter, I can keep the same quality in a smaller package so the result does not collapse. Which part of the output is essential for you?”

Strategy: do not discount unless the scope shrinks. Leave the last question open so the client chooses, instead of ending the conversation.`},"calendarReport",0,function(e,t,o){let a=e.filter(e=>e.trim()).length;return"fa"===o?`ارزیابی هوش مصنوعی:
ستون‌های پرشده: ${a} از ۴. اسلات‌های هفته: ${t}.
واچ‌تایم احتمالی وقتی هر ستون یک وعده مشخص دارد بالاتر است. اگر بیشتر از نصف اسلات‌ها فروش مستقیم باشد، آموزش را زیاد کن.
کلمات قابل آزمون این هفته را از خود ستون‌ها بردار، نه از هشتگ‌های کلی.`:`AI review:
Pillars filled: ${a} of 4. Weekly slots: ${t}.
Watch time is more likely when each pillar makes one promise. If more than half the slots are direct sales, add education.
Test words taken from the pillars themselves, not from generic hashtags.`},"critiqueIdea",0,function(e,t){let a=o(e||("fa"===t?"ایده‌ای که هنوز مبهم است":"an idea that is still foggy"),110);return"fa"===t?{reply:`ایده را این‌طور شنیدم: \xab${a}\xbb.

نقطه کور اول: هنوز معلوم نیست مشتری برای چه نتیجه‌ای پول می‌دهد، نه برای چه فعالیتی.
نقطه کور دوم: اگر سه نفر دیگر هم همین را بگویند، دلیل انتخاب تو چیست؟
نقطه کور سوم: مسیر رسیدن به سه مشتری آزمایشی، بدون بودجه سنگین تبلیغ، نوشته نشده.

هدف شفاف: تا ۳۰ روز آینده یک پیشنهاد مشخص را به یک قشر محدود بده و از سه نفر بازخورد صادقانه یا توصیه‌نامه بگیر.`,goal:"تا ۳۰ روز آینده یک پیشنهاد مشخص را برای یک قشر محدود اجرا کن و از سه نفر بازخورد یا توصیه‌نامه بگیر."}:{reply:`Here is what I heard: “${a}”.

Blind spot 1: it is still unclear which result the client pays for, rather than which activity you perform.
Blind spot 2: if three other people claim the same thing, why would someone pick you?
Blind spot 3: there is no path to three trial clients that does not depend on a large ad budget.

Clear goal: within 30 days, deliver one specific offer to a narrow group and collect honest feedback or a testimonial from three people.`,goal:"Within 30 days, deliver one specific offer to a narrow group and collect feedback or a testimonial from three people."}},"generateNames",0,function(e,o){let a=e.trim().split(/[\s,،]+/).filter(Boolean)[0]||("fa"===o?"نو":"nova");return("fa"===o?["آوا","هوم","ویو","فام","رایا","نِگار","لاب","کیا"]:["ora","haus","ly","lab","kit","studio","andco","wave"]).slice(0,6).map((e,n)=>{var r;let i,l,s="fa"===o?`${a}${n%2==0?"":" "}${e}`:`${a}${e}`,c=(i=s.match(/[اآویوؤئَُِaeiouy]/gi),Math.max(1,Math.min(5,i?.length??1))),d=(l=(r=`${a}${e}${n}`).toLowerCase().replace(/[^a-z0-9]/g,"")).length>=3?l.slice(0,16):`brand${(0,t.hashString)(r)%90+10}`;return{name:s.replace(/\s+/g,"fa"===o?"‌":""),handle:d,syllables:c,ease:c<=2?5:3===c?4:2,ir:(0,t.hashString)(`${s}.ir`)%4!=0,com:(0,t.hashString)(`${s}.com`)%3!=0,ig:(0,t.hashString)(`@${d}`)%5!=0}})},"imagePrompt",0,function(e,t,a,n,r){let i=o(e,80);return"fa"===r?`پرامپت ${n} برای ${t}:
${i}، نور طبیعی، چهره واقعی و بدون پوست پلاستیکی، ترکیب خلوت، فضای منفی برای عنوان فارسی، پالت ${a}، بدون متن داخل تصویر، جزئیات بافت پارچه و محیط، کیفیت تبلیغاتی.`:`${n} prompt for ${t}:
${i}, natural light, a real face without plastic skin, quiet composition, negative space for a title, palette ${a}, no text inside the image, fabric and place texture, advertising quality.`},"lessonOutput",0,function(e,t,a){let n=o(t,160);return"fa"===a?`خروجی عملی درس \xab${e}\xbb

بر اساس توضیح تو: ${n}

نسخه قابل استفاده:
- جمله اصلی: یک نتیجه مشخص برای یک مخاطب مشخص، با زمان تحویل.
- دلیل باور: یک نمونه‌کار یا یک مشاهده واقعی، نه صفت تبلیغاتی.
- دعوت: \xabاگر این خروجی را برای کار خودتان می‌خواهید، بنویسید کدام بخشش ضروری است.\xbb

این متن را می‌توانی به پروژه فعال بچسبانی و در قیف یا پکیج استفاده کنی.`:`Practical output for “${e}”

Based on your note: ${n}

Usable version:
- Core line: one defined result for one defined audience, with a delivery time.
- Reason to believe: one portfolio piece or one real observation, not an advertising adjective.
- Invitation: “If you want this output for your own work, tell me which part is essential.”

You can attach this to the active project and use it in the funnel or the offer.`},"mentorReply",0,function(e,t){let a=o(e,120);return"fa"===t?`مهدی کاظمی: \xab${a}\xbb را دیدم. قبل از جواب بلند، این را انجام بده: خروجی را در یک جمله بنویس و بگو مشتری با دیدنش چه تصمیمی می‌گیرد. همان جمله را همین‌جا بفرست تا متن نهایی را برایت تنظیم کنم. زمان پاسخ این گفتگو داخل تعهد زیر دو ساعت است.`:`Mehdi Kazemi: I saw “${a}”. Before a long answer, do this: write the output in one sentence and say what decision the client makes after seeing it. Send that sentence here and I will shape the final wording. This thread sits inside the under-two-hour promise.`},"personaCard",0,function(e,t){return"fa"===t?`${e.name||"مخاطب"}، ${e.age||"سن نامشخص"} ساله در ${e.city||"شهر نامشخص"}، شغل: ${e.job||"نامشخص"}.
بودجه: ${e.budget||"نامشخص"}. پلتفرم: ${e.platform||"نامشخص"}.
دغدغه: ${e.pains||"هنوز نوشته نشده"}.
لحن مؤثر: ${e.tone||"هنوز انتخاب نشده"}.`:`${e.name||"Audience"}, age ${e.age||"unknown"}, in ${e.city||"an unnamed city"}. Work: ${e.job||"unknown"}.
Budget: ${e.budget||"unknown"}. Platform: ${e.platform||"unknown"}.
Pain: ${e.pains||"not written yet"}.
Tone that lands: ${e.tone||"not chosen yet"}.`},"suggestCanvas",0,function(e,t){let o=e.niche.service.trim()||("fa"===t?"این خدمت":"this service"),a=e.niche.audience.trim()||("fa"===t?"یک قشر مشخص":"a specific group"),n=e.niche.outcome.trim()||("fa"===t?"یک نتیجه قابل نشان دادن":"a result you can show");return"fa"===t?{value:`${o} برای ${a} که به ${n} می‌رسد؛ با قیمت معلوم و تحویل زمان‌دار.`,channels:"آموزش کوتاه در یک پلتفرم اصلی، نمونه‌کار در استوری، و پیشنهاد مستقیم در دایرکت یا کانال.",customers:`${a}؛ بودجه‌ای که برای نتیجه مشخص کنار گذاشته، نه برای \xabهر جور محتوا\xbb.`}:{value:`${o} for ${a}, aimed at ${n}, with a visible price and a dated delivery.`,channels:"A short lesson on one main platform, proof in stories, and a direct offer in the inbox or channel.",customers:`${a}; people who have set money aside for a defined result, not for “some content”.`}},"supportReply",0,function(e,t,a){let n=o(t,140);return"summary"===e?"fa"===a?`خلاصه مسئله:
۱. خواسته اصلی: ${n}
۲. مانع احتمالی: خروجی مرحله قبل هنوز به یک جمله قابل تصمیم تبدیل نشده.
۳. قدم بعدی: همان مرحله را در بیزنس‌ساز باز کن و فقط یک فیلد را تا آخر پر کن.`:`Issue summary:
1. Main ask: ${n}
2. Likely blocker: the previous step is not yet a sentence you can decide with.
3. Next move: reopen that step in the business builder and finish one field completely.`:"debug"===e?"fa"===a?`بررسی سریع:
- اگر دکمه تولید خاموش است، موجودی توکن را ببین. آواتار ۱۰۰ و ویدیو ۵۰ توکن برمی‌دارد.
- اگر بنر ثبت نمی‌شود، تعداد مراحل پروژه فعال و سطح احراز هویت را با شرط همان اندازه مقایسه کن.
- تا قبل از تأیید کارشناس، مبلغ بنر کم نمی‌شود.
شرح تو: ${n}`:`Quick check:
- If generate is blocked, look at the token balance. Avatars cost 100 and video costs 50.
- If a banner will not submit, compare the active project’s finished steps and identity level with that size’s rule.
- Banner money is not taken before a reviewer approves it.
Your note: ${n}`:"fa"===a?`راهنمای گام‌به‌گام برای \xab${n}\xbb:
۱. پروژه فعال را در \xabکار من\xbb انتخاب کن.
۲. وارد بیزنس‌ساز شو و اولین مرحله ناتمام را باز کن.
۳. درس همان مرحله را تا پایان پخش کن.
۴. ابزار زیر ویدیو را پر کن و خروجی را ذخیره کن.
۵. اگر وسط کار گیر کردی، همین متن را برای منتور انسانی هم بفرست تا زیر دو ساعت جواب مشخص بگیری.`:`Steps for “${n}”:
1. Choose the active project in My work.
2. Open the business builder and expand the first unfinished step.
3. Play that step’s lesson through.
4. Fill the tool under the video.
5. If you stall, send the same note to the human mentor and expect a concrete reply inside two hours.`},"templateMessage",0,function(e,t,o){let a=t||("fa"===o?"برند":"the brand");return"welcome"===e?"fa"===o?`سلام، من ${a} هستم. برای اینکه پیشنهاد دقیق باشد، سه چیز را بگویید: کارتان چیست، تا چه تاریخی لازم دارید، و نتیجه را کجا نشان می‌دهید؟`:`Hello, this is ${a}. For a precise offer, tell me three things: what you do, the date you need it, and where the result will be shown.`:"fa"===o?"هزینه بر اساس خروجی است نه ساعت. سه سطح داریم: پایه، محبوب و ویژه. اگر بگویید نتیجه باید چه تصمیمی را برای مشتری شما بسازد، همان سطح را پیشنهاد می‌دهم.":"The fee is based on the outcome, not the hours. There are three levels: base, popular, and signature. Tell me what decision this result should create for your client, and I will recommend the level."},"videoBoard",0,function(e,t,a){let n=o(e,120);return"fa"===a?`استوری‌بورد ${t}
صحنه ۱ (۰–۳ ثانیه): هوک تصویری روی \xab${n}\xbb. حرکت سریع، بدون مقدمه لوگو.
صحنه ۲: نشان دادن نتیجه، نه فرآیند طولانی.
صحنه ۳: یک جمله دعوت و نام برند.
زیرنویس درشت در محدوده امن ۹:۱۶ پیشنهاد می‌شود. این پیش‌نمایش است؛ رندر نهایی در نسخه متصل به موتور انجام می‌شود.`:`${t} storyboard
Scene 1 (0–3s): a visual hook on “${n}”. Fast, no logo intro.
Scene 2: show the result, not a long process.
Scene 3: one invitation line and the brand name.
Large captions inside the 9:16 safe zone. This is a preview; the final render happens when the engine is connected.`},"voicePlan",0,function(e,t,a,n){let r=o(e,100);return"fa"===n?`طرح صدای ${t} (${a} دقیقه):
لحن آرام و مطمئن، مکث کوتاه بعد از جمله نتیجه.
متن: ${r}
اگر ورودی از موبایل است، اول نویز را با Adobe Podcast بگیر و بعد کلون ElevenLabs را فقط برای نسخه نهایی استفاده کن. موزیک زمینه را از Suno یا Udio بدون کلام بساز.`:`${t} voice plan (${a} min):
Calm, sure tone, with a short pause after the result sentence.
Script: ${r}
If the take is from a phone, remove noise with Adobe Podcast first and keep the ElevenLabs clone for the final version. Build a wordless bed in Suno or Udio.`}])},37801,e=>{"use strict";var t=e.i(53436),o=e.i(26971);function a(e){return new o.default(e).getCountries()}var n=e.i(33768);let r=new Intl.DisplayNames(["fa"],{type:"region"}),i=new Intl.DisplayNames(["en"],{type:"region"}),l=(function(){return(0,t.default)(a,arguments)})().map(e=>{let a=r.of(e),n=i.of(e);return a&&n?{iso:e,dial:function(){return(0,t.default)(o.getCountryCallingCode,arguments)}(e),fa:a,en:n}:null}).filter(e=>!!e).sort((e,t)=>e.fa.localeCompare(t.fa,"fa"));e.s(["COUNTRIES",0,l,"countryFlag",0,function(e){return e.toUpperCase().replace(/./g,e=>String.fromCodePoint(127397+e.charCodeAt(0)))},"formatStoredPhone",0,function(e){let t=(0,n.parsePhoneNumberFromString)(e);return t?.formatInternational()??e},"validatePhone",0,function(e,t){let o=t.trim();if(!o)return{ok:!1};let a=(0,n.parsePhoneNumberFromString)(o,e);return a&&a.country===e&&a.isValid()?{ok:!0,e164:a.number,international:a.formatInternational()}:{ok:!1}}],37801)}]);