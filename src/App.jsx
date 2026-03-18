import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, ReferenceLine, Area, ComposedChart } from "recharts";

// LMS percentile data from ENASEM 2012 (gamlss BCCGo)
const DATA = {
  vel: {
    Hombres: [
      {age:60,P5:0.708,P10:0.838,P25:1.007,P50:1.162,P75:1.289,P90:1.387,P95:1.440},
      {age:62,P5:0.644,P10:0.775,P25:0.967,P50:1.138,P75:1.277,P90:1.384,P95:1.441},
      {age:65,P5:0.573,P10:0.706,P25:0.912,P50:1.101,P75:1.256,P90:1.369,P95:1.437},
      {age:67,P5:0.537,P10:0.668,P25:0.876,P50:1.074,P75:1.236,P90:1.359,P95:1.425},
      {age:70,P5:0.494,P10:0.621,P25:0.827,P50:1.029,P75:1.198,P90:1.331,P95:1.394},
      {age:72,P5:0.469,P10:0.591,P25:0.795,P50:0.998,P75:1.168,P90:1.297,P95:1.367},
      {age:75,P5:0.434,P10:0.548,P25:0.743,P50:0.942,P75:1.110,P90:1.241,P95:1.307},
      {age:77,P5:0.411,P10:0.521,P25:0.709,P50:0.902,P75:1.067,P90:1.194,P95:1.262},
      {age:80,P5:0.385,P10:0.487,P25:0.667,P50:0.853,P75:1.013,P90:1.138,P95:1.203},
      {age:82,P5:0.371,P10:0.471,P25:0.645,P50:0.828,P75:0.986,P90:1.108,P95:1.173},
      {age:85,P5:0.349,P10:0.444,P25:0.610,P50:0.784,P75:0.936,P90:1.055,P95:1.117},
      {age:87,P5:0.332,P10:0.422,P25:0.580,P50:0.748,P75:0.894,P90:1.007,P95:1.068},
      {age:90,P5:0.304,P10:0.387,P25:0.532,P50:0.686,P75:0.822,P90:0.929,P95:0.984},
      {age:95,P5:0.256,P10:0.328,P25:0.450,P50:0.582,P75:0.699,P90:0.793,P95:0.838},
    ],
    Mujeres: [
      {age:60,P5:0.575,P10:0.670,P25:0.805,P50:0.977,P75:1.159,P90:1.337,P95:1.437},
      {age:62,P5:0.541,P10:0.624,P25:0.771,P50:0.944,P75:1.126,P90:1.299,P95:1.405},
      {age:65,P5:0.493,P10:0.573,P25:0.722,P50:0.895,P75:1.079,P90:1.253,P95:1.360},
      {age:67,P5:0.462,P10:0.545,P25:0.691,P50:0.864,P75:1.049,P90:1.223,P95:1.331},
      {age:70,P5:0.419,P10:0.499,P25:0.646,P50:0.820,P75:1.005,P90:1.181,P95:1.291},
      {age:72,P5:0.391,P10:0.472,P25:0.617,P50:0.791,P75:0.978,P90:1.155,P95:1.265},
      {age:75,P5:0.351,P10:0.430,P25:0.576,P50:0.751,P75:0.938,P90:1.117,P95:1.228},
      {age:77,P5:0.326,P10:0.406,P25:0.550,P50:0.725,P75:0.913,P90:1.092,P95:1.204},
      {age:80,P5:0.290,P10:0.369,P25:0.512,P50:0.687,P75:0.877,P90:1.058,P95:1.171},
      {age:82,P5:0.267,P10:0.345,P25:0.488,P50:0.664,P75:0.854,P90:1.036,P95:1.150},
      {age:85,P5:0.235,P10:0.310,P25:0.454,P50:0.630,P75:0.821,P90:1.006,P95:1.120},
      {age:87,P5:0.215,P10:0.291,P25:0.432,P50:0.608,P75:0.800,P90:0.985,P95:1.101},
      {age:90,P5:0.187,P10:0.259,P25:0.401,P50:0.577,P75:0.770,P90:0.957,P95:1.075},
      {age:95,P5:0.146,P10:0.211,P25:0.354,P50:0.529,P75:0.724,P90:0.914,P95:1.034},
    ]
  },
  grip: {
    Hombres: [
      {age:60,P5:22.4,P10:25.6,P25:30.0,P50:34.9,P75:39.6,P90:43.7,P95:46.1},
      {age:62,P5:21.3,P10:24.2,P25:28.9,P50:33.8,P75:38.5,P90:42.6,P95:45.0},
      {age:65,P5:19.7,P10:22.5,P25:27.3,P50:32.2,P75:36.9,P90:41.0,P95:43.3},
      {age:67,P5:18.6,P10:21.6,P25:26.3,P50:31.2,P75:35.9,P90:39.9,P95:42.3},
      {age:70,P5:17.1,P10:19.8,P25:24.8,P50:29.7,P75:34.4,P90:38.4,P95:40.8},
      {age:72,P5:16.1,P10:19.1,P25:23.8,P50:28.8,P75:33.4,P90:37.5,P95:39.8},
      {age:75,P5:14.7,P10:17.6,P25:22.5,P50:27.4,P75:32.1,P90:36.1,P95:38.4},
      {age:77,P5:13.9,P10:16.9,P25:21.6,P50:26.5,P75:31.2,P90:35.2,P95:37.6},
      {age:80,P5:12.6,P10:15.5,P25:20.4,P50:25.3,P75:29.9,P90:34.0,P95:36.3},
      {age:82,P5:11.8,P10:14.8,P25:19.6,P50:24.5,P75:29.1,P90:33.1,P95:35.5},
      {age:85,P5:10.7,P10:13.6,P25:18.4,P50:23.3,P75:28.0,P90:32.0,P95:34.3},
      {age:87,P5:10.1,P10:13.0,P25:17.7,P50:22.6,P75:27.2,P90:31.2,P95:33.5},
      {age:90,P5:9.1,P10:11.9,P25:16.7,P50:21.6,P75:26.2,P90:30.1,P95:32.4},
      {age:95,P5:7.7,P10:10.3,P25:15.1,P50:20.0,P75:24.5,P90:28.4,P95:30.7},
    ],
    Mujeres: [
      {age:60,P5:13.3,P10:15.5,P25:19.3,P50:23.1,P75:26.6,P90:29.7,P95:31.5},
      {age:62,P5:12.6,P10:14.9,P25:18.5,P50:22.3,P75:25.8,P90:28.9,P95:30.6},
      {age:65,P5:11.6,P10:13.8,P25:17.5,P50:21.2,P75:24.7,P90:27.7,P95:29.4},
      {age:67,P5:11.0,P10:13.3,P25:16.9,P50:20.6,P75:24.0,P90:27.0,P95:28.7},
      {age:70,P5:10.1,P10:12.3,P25:16.0,P50:19.7,P75:23.1,P90:26.1,P95:27.8},
      {age:72,P5:9.6,P10:11.9,P25:15.4,P50:19.1,P75:22.5,P90:25.5,P95:27.2},
      {age:75,P5:8.8,P10:11.0,P25:14.7,P50:18.3,P75:21.7,P90:24.7,P95:26.3},
      {age:77,P5:8.4,P10:10.6,P25:14.2,P50:17.9,P75:21.3,P90:24.2,P95:25.9},
      {age:80,P5:7.8,P10:9.9,P25:13.6,P50:17.3,P75:20.7,P90:23.6,P95:25.3},
      {age:82,P5:7.4,P10:9.7,P25:13.3,P50:17.0,P75:20.4,P90:23.3,P95:25.0},
      {age:85,P5:7.0,P10:9.2,P25:12.8,P50:16.6,P75:20.0,P90:23.0,P95:24.7},
      {age:87,P5:6.7,P10:8.9,P25:12.6,P50:16.3,P75:19.9,P90:22.8,P95:24.6},
      {age:90,P5:6.3,P10:8.5,P25:12.2,P50:16.1,P75:19.6,P90:22.6,P95:24.4},
      {age:95,P5:5.8,P10:7.9,P25:11.7,P50:15.7,P75:19.3,P90:22.4,P95:24.3},
    ]
  }
};

function interpolate(data, age, field) {
  if (age <= data[0].age) return data[0][field];
  if (age >= data[data.length-1].age) return data[data.length-1][field];
  for (let i = 0; i < data.length - 1; i++) {
    if (age >= data[i].age && age <= data[i+1].age) {
      const t = (age - data[i].age) / (data[i+1].age - data[i].age);
      return data[i][field] + t * (data[i+1][field] - data[i][field]);
    }
  }
  return null;
}

function getPercentileRank(data, age, value) {
  const percs = [5,10,25,50,75,90,95];
  const fields = ['P5','P10','P25','P50','P75','P90','P95'];
  const vals = fields.map(f => interpolate(data, age, f));
  
  if (value <= vals[0]) return { rank: "< P5", color: "#dc2626", level: "Muy bajo", desc: "Por debajo del percentil 5" };
  if (value <= vals[1]) return { rank: "P5–P10", color: "#ea580c", level: "Bajo", desc: "Entre percentiles 5 y 10" };
  if (value <= vals[2]) return { rank: "P10–P25", color: "#d97706", level: "Bajo-normal", desc: "Entre percentiles 10 y 25" };
  if (value <= vals[3]) return { rank: "P25–P50", color: "#65a30d", level: "Normal", desc: "Entre percentiles 25 y 50" };
  if (value <= vals[4]) return { rank: "P50–P75", color: "#16a34a", level: "Normal", desc: "Entre percentiles 50 y 75" };
  if (value <= vals[5]) return { rank: "P75–P90", color: "#0d9488", level: "Alto", desc: "Entre percentiles 75 y 90" };
  if (value <= vals[6]) return { rank: "P90–P95", color: "#2563eb", level: "Muy alto", desc: "Entre percentiles 90 y 95" };
  return { rank: "> P95", color: "#7c3aed", level: "Excepcional", desc: "Por encima del percentil 95" };
}

function ResultCard({ label, value, unit, data, age }) {
  if (!value || !age || age < 60 || age > 95) return null;
  const numVal = parseFloat(value);
  if (isNaN(numVal)) return null;
  
  const result = getPercentileRank(data, age, numVal);
  const p50 = interpolate(data, age, 'P50');
  const diff = numVal - p50;
  const pct = ((diff / p50) * 100).toFixed(0);
  
  return (
    <div style={{background:'white',borderRadius:12,padding:'20px 24px',boxShadow:'0 1px 3px rgba(0,0,0,0.1)',border:`2px solid ${result.color}22`}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <span style={{fontSize:13,fontWeight:600,color:'#64748b',textTransform:'uppercase',letterSpacing:1}}>{label}</span>
        <span style={{fontSize:13,background:result.color+'18',color:result.color,padding:'3px 10px',borderRadius:20,fontWeight:600}}>{result.rank}</span>
      </div>
      <div style={{display:'flex',alignItems:'baseline',gap:6,marginBottom:4}}>
        <span style={{fontSize:36,fontWeight:700,color:'#0f172a'}}>{numVal.toFixed(label.includes('Vel') ? 2 : 0)}</span>
        <span style={{fontSize:16,color:'#94a3b8'}}>{unit}</span>
      </div>
      <div style={{fontSize:14,color:result.color,fontWeight:600,marginBottom:2}}>{result.level}</div>
      <div style={{fontSize:13,color:'#64748b'}}>{result.desc}</div>
      <div style={{fontSize:12,color:'#94a3b8',marginTop:8}}>
        Mediana esperada: {p50.toFixed(label.includes('Vel') ? 2 : 1)} {unit} ({pct > 0 ? '+' : ''}{pct}%)
      </div>
    </div>
  );
}

function PercentileChart({ data, age, value, label, unit, color }) {
  const numVal = parseFloat(value);
  const hasValue = age >= 60 && age <= 95 && !isNaN(numVal);
  
  const chartData = data.map(d => ({
    age: d.age,
    P5: d.P5, P10: d.P10, P25: d.P25, P50: d.P50, P75: d.P75, P90: d.P90, P95: d.P95,
    band1: d.P25 - d.P5,
    band2: d.P75 - d.P25,
    band3: d.P95 - d.P75,
  }));

  return (
    <div style={{background:'white',borderRadius:12,padding:'20px 16px 10px',boxShadow:'0 1px 3px rgba(0,0,0,0.1)'}}>
      <div style={{fontSize:14,fontWeight:600,color:'#334155',marginBottom:12,paddingLeft:8}}>{label}</div>
      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart data={chartData} margin={{top:5,right:10,left:0,bottom:5}}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="age" tick={{fontSize:11}} stroke="#94a3b8" label={{value:'Edad',position:'bottom',offset:-2,fontSize:11,fill:'#94a3b8'}} />
          <YAxis tick={{fontSize:11}} stroke="#94a3b8" label={{value:unit,angle:-90,position:'insideLeft',offset:10,fontSize:11,fill:'#94a3b8'}} />
          <Area dataKey="P5" stackId="1" fill="transparent" stroke="none" />
          <Area dataKey="band1" stackId="1" fill={color+"15"} stroke="none" />
          <Area dataKey="band2" stackId="1" fill={color+"25"} stroke="none" />
          <Area dataKey="band3" stackId="1" fill={color+"15"} stroke="none" />
          <Line dataKey="P5" stroke={color} strokeWidth={1} strokeDasharray="4 4" dot={false} />
          <Line dataKey="P25" stroke={color} strokeWidth={1} strokeDasharray="2 2" dot={false} />
          <Line dataKey="P50" stroke={color} strokeWidth={2.5} dot={false} />
          <Line dataKey="P75" stroke={color} strokeWidth={1} strokeDasharray="2 2" dot={false} />
          <Line dataKey="P95" stroke={color} strokeWidth={1} strokeDasharray="4 4" dot={false} />
          {hasValue && <ReferenceDot x={age} y={numVal} r={7} fill="#ef4444" stroke="white" strokeWidth={2} />}
          {hasValue && <ReferenceLine x={age} stroke="#ef444466" strokeDasharray="3 3" />}
          <Tooltip
            contentStyle={{fontSize:12,borderRadius:8,border:'1px solid #e2e8f0'}}
            formatter={(v,n) => [typeof v === 'number' ? v.toFixed(2) : v, n]}
            labelFormatter={v => `Edad: ${v} años`}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <div style={{display:'flex',justifyContent:'center',gap:16,fontSize:11,color:'#94a3b8',marginTop:4}}>
        <span>--- P5</span><span>-- P25</span><span style={{fontWeight:700,color:color}}>— P50</span><span>-- P75</span><span>--- P95</span>
        {hasValue && <span style={{color:'#ef4444',fontWeight:600}}>● Paciente</span>}
      </div>
    </div>
  );
}

export default function App() {
  const [sex, setSex] = useState("Hombres");
  const [age, setAge] = useState("");
  const [vel, setVel] = useState("");
  const [grip, setGrip] = useState("");

  const ageNum = parseInt(age);
  const velData = DATA.vel[sex];
  const gripData = DATA.grip[sex];

  const ewgsop2Grip = sex === "Hombres" ? 27 : 16;
  const gripNum = parseFloat(grip);
  const velNum = parseFloat(vel);

  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#f8fafc 0%,#eef2ff 50%,#f0fdf4 100%)',fontFamily:'"Source Sans 3",system-ui,sans-serif'}}>
      {/* Header */}
      <div style={{background:'linear-gradient(135deg,#1e3a5f 0%,#0f766e 100%)',padding:'28px 24px 24px',color:'white'}}>
        <div style={{maxWidth:800,margin:'0 auto'}}>
          <div style={{fontSize:11,fontWeight:600,letterSpacing:2,opacity:0.7,textTransform:'uppercase',marginBottom:4}}>Calculadora Clínica</div>
          <h1 style={{fontSize:22,fontWeight:700,margin:'0 0 6px',lineHeight:1.3}}>Valores Normativos — Adultos Mayores Mexicanos</h1>
          <div style={{fontSize:13,opacity:0.8}}>Velocidad de marcha (4m) y fuerza de prensión manual · ENASEM 2012 · Método LMS (BCCGo)</div>
        </div>
      </div>

      <div style={{maxWidth:800,margin:'0 auto',padding:'20px 16px 40px'}}>
        {/* Input Section */}
        <div style={{background:'white',borderRadius:12,padding:'20px 24px',marginBottom:16,boxShadow:'0 1px 3px rgba(0,0,0,0.1)'}}>
          <div style={{fontSize:14,fontWeight:600,color:'#334155',marginBottom:16}}>Datos del paciente</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:12}}>
            <div>
              <label style={{fontSize:12,color:'#64748b',fontWeight:500,display:'block',marginBottom:4}}>Sexo</label>
              <div style={{display:'flex',gap:4}}>
                {["Hombres","Mujeres"].map(s => (
                  <button key={s} onClick={() => setSex(s)}
                    style={{flex:1,padding:'8px 0',borderRadius:8,border:'1px solid',cursor:'pointer',fontSize:13,fontWeight:600,transition:'all 0.2s',
                      background:sex===s?'#1e3a5f':'white',color:sex===s?'white':'#64748b',borderColor:sex===s?'#1e3a5f':'#e2e8f0'}}>
                    {s === "Hombres" ? "♂ Hombre" : "♀ Mujer"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={{fontSize:12,color:'#64748b',fontWeight:500,display:'block',marginBottom:4}}>Edad (años)</label>
              <input type="number" min="60" max="95" value={age} onChange={e=>setAge(e.target.value)} placeholder="60–95"
                style={{width:'100%',padding:'8px 12px',borderRadius:8,border:'1px solid #e2e8f0',fontSize:14,boxSizing:'border-box',outline:'none'}} />
            </div>
            <div>
              <label style={{fontSize:12,color:'#64748b',fontWeight:500,display:'block',marginBottom:4}}>Vel. marcha (m/s)</label>
              <input type="number" step="0.01" min="0" max="3" value={vel} onChange={e=>setVel(e.target.value)} placeholder="ej: 0.85"
                style={{width:'100%',padding:'8px 12px',borderRadius:8,border:'1px solid #e2e8f0',fontSize:14,boxSizing:'border-box',outline:'none'}} />
            </div>
            <div>
              <label style={{fontSize:12,color:'#64748b',fontWeight:500,display:'block',marginBottom:4}}>Fuerza prensión (kg)</label>
              <input type="number" step="0.5" min="0" max="80" value={grip} onChange={e=>setGrip(e.target.value)} placeholder="ej: 28"
                style={{width:'100%',padding:'8px 12px',borderRadius:8,border:'1px solid #e2e8f0',fontSize:14,boxSizing:'border-box',outline:'none'}} />
            </div>
          </div>
        </div>

        {/* Results */}
        {ageNum >= 60 && ageNum <= 95 && (vel || grip) && (
          <>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
              {vel && <ResultCard label="Vel. marcha" value={vel} unit="m/s" data={velData} age={ageNum} />}
              {grip && <ResultCard label="Fuerza prensión" value={grip} unit="kg" data={gripData} age={ageNum} />}
            </div>

            {/* Clinical alerts */}
            {(velNum < 0.8 || gripNum < ewgsop2Grip) && (
              <div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:12,padding:'14px 20px',marginBottom:16}}>
                <div style={{fontSize:13,fontWeight:700,color:'#991b1b',marginBottom:6}}>⚠ Alerta clínica</div>
                {velNum < 0.8 && <div style={{fontSize:13,color:'#7f1d1d',marginBottom:2}}>• Velocidad de marcha {"<"} 0.8 m/s — indicador de fragilidad y riesgo de dependencia (Studenski, 2011)</div>}
                {gripNum > 0 && gripNum < ewgsop2Grip && <div style={{fontSize:13,color:'#7f1d1d'}}>• Fuerza de prensión {"<"} {ewgsop2Grip} kg — sarcopenia probable según criterios EWGSOP2 (Cruz-Jentoft et al., 2019)</div>}
              </div>
            )}

            {/* Charts */}
            <div style={{display:'grid',gridTemplateColumns:'1fr',gap:12}}>
              {vel && <PercentileChart data={velData} age={ageNum} value={vel} label={`Velocidad de marcha — ${sex}`} unit="m/s" color="#0f766e" />}
              {grip && <PercentileChart data={gripData} age={ageNum} value={grip} label={`Fuerza de prensión — ${sex}`} unit="kg" color="#1e3a5f" />}
            </div>
          </>
        )}

        {/* Empty state */}
        {(!age || ageNum < 60 || ageNum > 95 || (!vel && !grip)) && (
          <div style={{textAlign:'center',padding:'40px 20px',color:'#94a3b8'}}>
            <div style={{fontSize:40,marginBottom:12}}>📊</div>
            <div style={{fontSize:15,fontWeight:500}}>Ingrese los datos del paciente</div>
            <div style={{fontSize:13,marginTop:4}}>Edad (60–95 años) y al menos una medición funcional</div>
          </div>
        )}

        {/* Footer */}
        <div style={{marginTop:24,padding:'16px 20px',background:'white',borderRadius:12,boxShadow:'0 1px 3px rgba(0,0,0,0.05)'}}>
          <div style={{fontSize:12,color:'#94a3b8',lineHeight:1.6}}>
            <strong style={{color:'#64748b'}}>Referencia:</strong> Alvarado-Lara MR. Valores normativos por edad y sexo de la velocidad de la marcha y la fuerza de prensión en personas mayores mexicanas. Tesis de Maestría, 2026. Datos: ENASEM 2012 (n=1,102). Método: LMS (BCCGo) con gamlss.
            <br/><strong style={{color:'#64748b'}}>Nota:</strong> Esta herramienta es de apoyo clínico y no sustituye el juicio médico. Los valores de referencia corresponden a población mexicana de 60 años o más.
          </div>
        </div>
      </div>
    </div>
  );
}
