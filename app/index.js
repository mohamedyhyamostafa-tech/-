export default function Home() {
  return (
    <div>
      <style jsx>{`
        :root{--bg:#0b1d40;--panel:#081028;--accent:#ffd700;--text:#e9f2ff;}
        body{margin:0;font-family:Tahoma,Arial,sans-serif;background:linear-gradient(180deg,#07102a,#0b1d40);color:var(--text);display:flex;align-items:center;justify-content:center}
        .calc{width:360px;max-width:92vw;background:linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.08));border-radius:16px;padding:18px;box-shadow:0 10px 30px rgba(0,0,0,0.6)}
        .screen{background:var(--panel);border-radius:10px;padding:14px;text-align:right;font-size:32px;min-height:56px;color:var(--text);box-shadow:inset 0 -6px 18px rgba(0,0,0,0.6)}
        .small{font-size:14px;color:#9fb3d9}
        .keys{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:12px}
        button{padding:16px;border-radius:10px;border:0;background:#0f1b36;color:var(--text);font-size:18px;cursor:pointer;box-shadow:0 6px 12px rgba(0,0,0,0.4)}
        button.op{background:linear-gradient(180deg,#ffd700,#ffb200);color:#111;font-weight:700}
        button.keywide{grid-column:span 2}
        button:active{transform:translateY(2px);box-shadow:0 4px 8px rgba(0,0,0,0.4)}
        footer{margin-top:12px;text-align:center;color:#9fb3d9;font-size:13px}
      `}</style>

      <div className="calc">
        <div className="screen" id="screen">
          <div className="small" id="history">&nbsp;</div>
          <div id="display">0</div>
        </div>

        <div className="keys" id="keys">
          <button data-action="clear" className="op">C</button>
          <button data-action="back">⌫</button>
          <button data-action="percent">%</button>
          <button data-action="divide" className="op">÷</button>

          <button>7</button><button>8</button><button>9</button><button data-action="multiply" className="op">×</button>
          <button>4</button><button>5</button><button>6</button><button data-action="minus" className="op">−</button>
          <button>1</button><button>2</button><button>3</button><button data-action="plus" className="op">+</button>
          <button className="keywide" data-action="plusminus">±</button>
          <button>0</button>
          <button data-action="dot">.</button>
          <button data-action="equals" className="op">=</button>
        </div>

        <footer>Alzaeem Tech • Accessible from any device via URL</footer>
      </div>

      <script dangerouslySetInnerHTML={{__html:`
        (function(){
          const display = document.getElementById('display');
          const history = document.getElementById('history');
          const keys = document.getElementById('keys');
          let current = '0', previous = null, operator = null, overwrite = false;
          function update(){ display.textContent=current; history.textContent=previous?previous+' '+(operator||''):''; }
          function inputDigit(d){ if(overwrite||current==='0'){current=d;overwrite=false;}else{current+=d;} }
          function inputDot(){ if(overwrite){current='0.';overwrite=false;return;} if(!current.includes('.')) current+='.'; }
          function clearAll(){current='0';previous=null;operator=null;overwrite=false;}
          function backspace(){ if(overwrite||current.length===1){current='0';overwrite=false;return;} current=current.slice(0,-1);}
          function toggleSign(){ if(current==='0') return; current=(parseFloat(current)*-1).toString();}
          function percent(){ current=(parseFloat(current)/100).toString(); overwrite=true;}
          function applyOperator(op){ const curr=parseFloat(current); if(previous===null){previous=curr;} else if(operator){previous=compute(previous,curr,operator);} operator=op; overwrite=true; current=previous.toString();}
          function compute(a,b,op){ if(op==='+')return a+b;if(op==='-')return a-b;if(op==='*')return a*b;if(op==='/')return b===0?NaN:a/b;return b;}
          function equals(){ if(operator===null||previous===null)return; const result=compute(previous,parseFloat(current),operator); current=(isFinite(result)?result:'Error').toString(); previous=null; operator=null; overwrite=true;}
          keys.addEventListener('click',e=>{const t=e.target;if(t.tagName!=='BUTTON') return; const val=t.textContent; const action=t.dataset.action; switch(action){case'clear':clearAll();break;case'back':backspace();break;case'dot':inputDot();break;case'plus':applyOperator('+');break;case'minus':applyOperator('-');break;case'multiply':applyOperator('*');break;case'divide':applyOperator('/');break;case'equals':equals();break;case'plusminus':toggleSign();break;case'percent':percent();break;default: if(/^\d$/.test(val)) inputDigit(val);} update();});
          window.addEventListener('keydown',e=>{ if(e.key>='0'&&e.key<='9')inputDigit(e.key); if(e.key==='.')inputDot(); if(e.key==='Backspace')backspace(); if(e.key==='Enter'||e.key==='=')equals(); if(e.key==='+')applyOperator('+'); if(e.key==='-')applyOperator('-'); if(e.key==='*')applyOperator('*'); if(e.key==='/')applyOperator('/'); if(e.key==='%')percent(); update();});
          update();
        })();
      `}} />
    </div>
  )
}
