import { useState } from "react";
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, ReferenceLine, Area } from "recharts";

const DATA = {
  vel: {
    Hombres: [
      {age:60,P5:0.708,P10:0.832,P25:1.007,P50:1.162,P75:1.289,P90:1.387,P95:1.440},{age:61,P5:0.674,P10:0.803,P25:0.986,P50:1.150,P75:1.283,P90:1.385,P95:1.441},{age:62,P5:0.644,P10:0.775,P25:0.967,P50:1.138,P75:1.277,P90:1.384,P95:1.441},{age:63,P5:0.617,P10:0.751,P25:0.948,P50:1.127,P75:1.272,P90:1.382,P95:1.442},{age:64,P5:0.594,P10:0.728,P25:0.930,P50:1.114,P75:1.265,P90:1.379,P95:1.440},{age:65,P5:0.573,P10:0.706,P25:0.912,P50:1.101,P75:1.256,P90:1.374,P95:1.437},{age:66,P5:0.554,P10:0.686,P25:0.894,P50:1.088,P75:1.246,P90:1.367,P95:1.432},{age:67,P5:0.537,P10:0.668,P25:0.876,P50:1.074,P75:1.236,P90:1.359,P95:1.425},{age:68,P5:0.521,P10:0.651,P25:0.859,P50:1.059,P75:1.224,P90:1.349,P95:1.416},{age:69,P5:0.507,P10:0.635,P25:0.843,P50:1.044,P75:1.211,P90:1.338,P95:1.406},{age:70,P5:0.494,P10:0.620,P25:0.827,P50:1.029,P75:1.198,P90:1.326,P95:1.394},{age:71,P5:0.481,P10:0.605,P25:0.811,P50:1.014,P75:1.183,P90:1.313,P95:1.382},{age:72,P5:0.469,P10:0.591,P25:0.795,P50:0.998,P75:1.168,P90:1.297,P95:1.367},{age:73,P5:0.457,P10:0.577,P25:0.778,P50:0.980,P75:1.150,P90:1.280,P95:1.349},{age:74,P5:0.445,P10:0.563,P25:0.761,P50:0.961,P75:1.131,P90:1.260,P95:1.329},{age:75,P5:0.434,P10:0.548,P25:0.743,P50:0.942,P75:1.110,P90:1.239,P95:1.307},{age:76,P5:0.422,P10:0.534,P25:0.726,P50:0.922,P75:1.088,P90:1.216,P95:1.285},{age:77,P5:0.411,P10:0.521,P25:0.709,P50:0.902,P75:1.067,P90:1.194,P95:1.262},{age:78,P5:0.401,P10:0.509,P25:0.693,P50:0.884,P75:1.047,P90:1.173,P95:1.240},{age:79,P5:0.392,P10:0.498,P25:0.679,P50:0.867,P75:1.029,P90:1.154,P95:1.220},{age:80,P5:0.385,P10:0.488,P25:0.667,P50:0.853,P75:1.013,P90:1.137,P95:1.203},{age:81,P5:0.378,P10:0.479,P25:0.656,P50:0.840,P75:0.999,P90:1.122,P95:1.188},{age:82,P5:0.371,P10:0.471,P25:0.645,P50:0.828,P75:0.986,P90:1.108,P95:1.173},{age:83,P5:0.364,P10:0.463,P25:0.635,P50:0.815,P75:0.971,P90:1.092,P95:1.157},{age:84,P5:0.357,P10:0.454,P25:0.623,P50:0.800,P75:0.955,P90:1.074,P95:1.138},{age:85,P5:0.349,P10:0.444,P25:0.610,P50:0.784,P75:0.936,P90:1.054,P95:1.117},{age:86,P5:0.341,P10:0.433,P25:0.595,P50:0.767,P75:0.916,P90:1.032,P95:1.094},{age:87,P5:0.332,P10:0.422,P25:0.580,P50:0.748,P75:0.894,P90:1.007,P95:1.068},{age:88,P5:0.323,P10:0.410,P25:0.565,P50:0.728,P75:0.871,P90:0.982,P95:1.041},{age:89,P5:0.313,P10:0.398,P25:0.548,P50:0.707,P75:0.847,P90:0.955,P95:1.013},{age:90,P5:0.304,P10:0.386,P25:0.532,P50:0.686,P75:0.822,P90:0.927,P95:0.984},{age:91,P5:0.294,P10:0.374,P25:0.515,P50:0.665,P75:0.797,P90:0.899,P95:0.954},{age:92,P5:0.284,P10:0.361,P25:0.498,P50:0.643,P75:0.771,P90:0.871,P95:0.924},{age:93,P5:0.275,P10:0.349,P25:0.482,P50:0.622,P75:0.747,P90:0.843,P95:0.895},{age:94,P5:0.265,P10:0.338,P25:0.466,P50:0.602,P75:0.722,P90:0.816,P95:0.866},{age:95,P5:0.256,P10:0.326,P25:0.450,P50:0.582,P75:0.699,P90:0.789,P95:0.838},
    ],
    Mujeres: [
      {age:60,P5:0.575,P10:0.658,P25:0.805,P50:0.977,P75:1.159,P90:1.331,P95:1.437},{age:61,P5:0.558,P10:0.641,P25:0.788,P50:0.960,P75:1.143,P90:1.314,P95:1.421},{age:62,P5:0.541,P10:0.624,P25:0.771,P50:0.944,P75:1.126,P90:1.299,P95:1.405},{age:63,P5:0.525,P10:0.608,P25:0.754,P50:0.927,P75:1.110,P90:1.283,P95:1.390},{age:64,P5:0.509,P10:0.592,P25:0.738,P50:0.911,P75:1.094,P90:1.268,P95:1.375},{age:65,P5:0.493,P10:0.576,P25:0.722,P50:0.895,P75:1.079,P90:1.252,P95:1.360},{age:66,P5:0.478,P10:0.560,P25:0.706,P50:0.879,P75:1.064,P90:1.238,P95:1.346},{age:67,P5:0.462,P10:0.545,P25:0.691,P50:0.864,P75:1.049,P90:1.223,P95:1.331},{age:68,P5:0.448,P10:0.530,P25:0.675,P50:0.849,P75:1.034,P90:1.209,P95:1.318},{age:69,P5:0.433,P10:0.515,P25:0.661,P50:0.834,P75:1.019,P90:1.195,P95:1.304},{age:70,P5:0.419,P10:0.500,P25:0.646,P50:0.820,P75:1.005,P90:1.181,P95:1.291},{age:71,P5:0.405,P10:0.486,P25:0.631,P50:0.805,P75:0.991,P90:1.168,P95:1.278},{age:72,P5:0.391,P10:0.472,P25:0.617,P50:0.791,P75:0.978,P90:1.155,P95:1.265},{age:73,P5:0.377,P10:0.458,P25:0.603,P50:0.778,P75:0.964,P90:1.142,P95:1.252},{age:74,P5:0.364,P10:0.445,P25:0.590,P50:0.764,P75:0.951,P90:1.129,P95:1.240},{age:75,P5:0.351,P10:0.431,P25:0.576,P50:0.751,P75:0.938,P90:1.117,P95:1.228},{age:76,P5:0.338,P10:0.418,P25:0.563,P50:0.738,P75:0.925,P90:1.104,P95:1.216},{age:77,P5:0.326,P10:0.406,P25:0.550,P50:0.725,P75:0.913,P90:1.092,P95:1.204},{age:78,P5:0.313,P10:0.393,P25:0.537,P50:0.712,P75:0.900,P90:1.081,P95:1.193},{age:79,P5:0.302,P10:0.381,P25:0.525,P50:0.700,P75:0.888,P90:1.069,P95:1.182},{age:80,P5:0.290,P10:0.369,P25:0.512,P50:0.687,P75:0.877,P90:1.058,P95:1.171},{age:81,P5:0.278,P10:0.357,P25:0.500,P50:0.675,P75:0.865,P90:1.047,P95:1.161},{age:82,P5:0.267,P10:0.345,P25:0.488,P50:0.664,P75:0.854,P90:1.036,P95:1.150},{age:83,P5:0.256,P10:0.334,P25:0.477,P50:0.652,P75:0.842,P90:1.025,P95:1.140},{age:84,P5:0.246,P10:0.323,P25:0.465,P50:0.641,P75:0.831,P90:1.015,P95:1.130},{age:85,P5:0.235,P10:0.312,P25:0.454,P50:0.630,P75:0.821,P90:1.005,P95:1.120},{age:86,P5:0.225,P10:0.301,P25:0.443,P50:0.619,P75:0.810,P90:0.995,P95:1.111},{age:87,P5:0.215,P10:0.291,P25:0.432,P50:0.608,P75:0.800,P90:0.985,P95:1.101},{age:88,P5:0.205,P10:0.281,P25:0.422,P50:0.597,P75:0.790,P90:0.976,P95:1.092},{age:89,P5:0.196,P10:0.271,P25:0.411,P50:0.587,P75:0.780,P90:0.966,P95:1.083},{age:90,P5:0.187,P10:0.261,P25:0.401,P50:0.577,P75:0.770,P90:0.957,P95:1.075},{age:91,P5:0.178,P10:0.252,P25:0.391,P50:0.567,P75:0.760,P90:0.948,P95:1.066},{age:92,P5:0.170,P10:0.243,P25:0.382,P50:0.557,P75:0.751,P90:0.939,P95:1.058},{age:93,P5:0.162,P10:0.234,P25:0.372,P50:0.547,P75:0.742,P90:0.931,P95:1.050},{age:94,P5:0.154,P10:0.225,P25:0.363,P50:0.538,P75:0.733,P90:0.922,P95:1.042},{age:95,P5:0.146,P10:0.216,P25:0.354,P50:0.529,P75:0.724,P90:0.914,P95:1.034},
    ]
  },
  grip: {
    Hombres: [
      {age:60,P5:22.4,P10:25.4,P25:30.0,P50:34.9,P75:39.6,P90:43.7,P95:46.1},{age:61,P5:21.9,P10:24.8,P25:29.4,P50:34.4,P75:39.1,P90:43.1,P95:45.5},{age:62,P5:21.3,P10:24.2,P25:28.9,P50:33.8,P75:38.5,P90:42.6,P95:45.0},{age:63,P5:20.7,P10:23.7,P25:28.3,P50:33.3,P75:38.0,P90:42.0,P95:44.4},{age:64,P5:20.2,P10:23.1,P25:27.8,P50:32.7,P75:37.4,P90:41.5,P95:43.9},{age:65,P5:19.7,P10:22.6,P25:27.3,P50:32.2,P75:36.9,P90:41.0,P95:43.3},{age:66,P5:19.1,P10:22.1,P25:26.8,P50:31.7,P75:36.4,P90:40.4,P95:42.8},{age:67,P5:18.6,P10:21.6,P25:26.3,P50:31.2,P75:35.9,P90:39.9,P95:42.3},{age:68,P5:18.1,P10:21.1,P25:25.7,P50:30.7,P75:35.4,P90:39.4,P95:41.8},{age:69,P5:17.6,P10:20.6,P25:25.3,P50:30.2,P75:34.9,P90:38.9,P95:41.3},{age:70,P5:17.1,P10:20.1,P25:24.8,P50:29.7,P75:34.4,P90:38.4,P95:40.8},{age:71,P5:16.6,P10:19.6,P25:24.3,P50:29.2,P75:33.9,P90:38.0,P95:40.3},{age:72,P5:16.1,P10:19.1,P25:23.8,P50:28.8,P75:33.4,P90:37.5,P95:39.8},{age:73,P5:15.7,P10:18.6,P25:23.4,P50:28.3,P75:33.0,P90:37.0,P95:39.4},{age:74,P5:15.2,P10:18.2,P25:22.9,P50:27.8,P75:32.5,P90:36.6,P95:38.9},{age:75,P5:14.7,P10:17.7,P25:22.5,P50:27.4,P75:32.1,P90:36.1,P95:38.4},{age:76,P5:14.3,P10:17.3,P25:22.0,P50:27.0,P75:31.6,P90:35.7,P95:38.0},{age:77,P5:13.9,P10:16.9,P25:21.6,P50:26.5,P75:31.2,P90:35.2,P95:37.6},{age:78,P5:13.4,P10:16.4,P25:21.2,P50:26.1,P75:30.8,P90:34.8,P95:37.1},{age:79,P5:13.0,P10:16.0,P25:20.8,P50:25.7,P75:30.4,P90:34.4,P95:36.7},{age:80,P5:12.6,P10:15.6,P25:20.4,P50:25.3,P75:29.9,P90:33.9,P95:36.3},{age:81,P5:12.2,P10:15.2,P25:20.0,P50:24.9,P75:29.5,P90:33.5,P95:35.9},{age:82,P5:11.8,P10:14.8,P25:19.6,P50:24.5,P75:29.1,P90:33.1,P95:35.5},{age:83,P5:11.5,P10:14.4,P25:19.2,P50:24.1,P75:28.7,P90:32.7,P95:35.1},{age:84,P5:11.1,P10:14.1,P25:18.8,P50:23.7,P75:28.4,P90:32.4,P95:34.7},{age:85,P5:10.7,P10:13.7,P25:18.4,P50:23.3,P75:28.0,P90:32.0,P95:34.3},{age:86,P5:10.4,P10:13.3,P25:18.1,P50:23.0,P75:27.6,P90:31.6,P95:33.9},{age:87,P5:10.1,P10:13.0,P25:17.7,P50:22.6,P75:27.2,P90:31.2,P95:33.5},{age:88,P5:9.7,P10:12.6,P25:17.4,P50:22.3,P75:26.9,P90:30.9,P95:33.2},{age:89,P5:9.4,P10:12.3,P25:17.0,P50:21.9,P75:26.5,P90:30.5,P95:32.8},{age:90,P5:9.1,P10:12.0,P25:16.7,P50:21.6,P75:26.2,P90:30.1,P95:32.4},{age:91,P5:8.8,P10:11.7,P25:16.3,P50:21.2,P75:25.8,P90:29.8,P95:32.1},{age:92,P5:8.5,P10:11.4,P25:16.0,P50:20.9,P75:25.5,P90:29.5,P95:31.7},{age:93,P5:8.2,P10:11.1,P25:15.7,P50:20.6,P75:25.2,P90:29.1,P95:31.4},{age:94,P5:8.0,P10:10.8,P25:15.4,P50:20.3,P75:24.9,P90:28.8,P95:31.1},{age:95,P5:7.7,P10:10.5,P25:15.1,P50:20.0,P75:24.5,P90:28.5,P95:30.7},
    ],
    Mujeres: [
      {age:60,P5:13.3,P10:15.6,P25:19.3,P50:23.1,P75:26.6,P90:29.7,P95:31.5},{age:61,P5:12.9,P10:15.3,P25:18.9,P50:22.7,P75:26.2,P90:29.3,P95:31.0},{age:62,P5:12.6,P10:14.9,P25:18.5,P50:22.3,P75:25.8,P90:28.9,P95:30.6},{age:63,P5:12.2,P10:14.6,P25:18.2,P50:21.9,P75:25.4,P90:28.5,P95:30.2},{age:64,P5:11.9,P10:14.2,P25:17.8,P50:21.6,P75:25.1,P90:28.1,P95:29.8},{age:65,P5:11.6,P10:13.9,P25:17.5,P50:21.2,P75:24.7,P90:27.7,P95:29.4},{age:66,P5:11.3,P10:13.6,P25:17.2,P50:20.9,P75:24.4,P90:27.4,P95:29.1},{age:67,P5:11.0,P10:13.3,P25:16.9,P50:20.6,P75:24.0,P90:27.0,P95:28.7},{age:68,P5:10.7,P10:13.0,P25:16.6,P50:20.3,P75:23.7,P90:26.7,P95:28.4},{age:69,P5:10.4,P10:12.7,P25:16.3,P50:20.0,P75:23.4,P90:26.4,P95:28.1},{age:70,P5:10.1,P10:12.4,P25:16.0,P50:19.7,P75:23.1,P90:26.1,P95:27.8},{age:71,P5:9.8,P10:12.1,P25:15.7,P50:19.4,P75:22.8,P90:25.8,P95:27.5},{age:72,P5:9.6,P10:11.9,P25:15.4,P50:19.1,P75:22.5,P90:25.5,P95:27.2},{age:73,P5:9.3,P10:11.6,P25:15.2,P50:18.8,P75:22.2,P90:25.2,P95:26.9},{age:74,P5:9.1,P10:11.3,P25:14.9,P50:18.6,P75:22.0,P90:24.9,P95:26.6},{age:75,P5:8.8,P10:11.1,P25:14.7,P50:18.3,P75:21.7,P90:24.6,P95:26.3},{age:76,P5:8.6,P10:10.9,P25:14.4,P50:18.1,P75:21.5,P90:24.4,P95:26.1},{age:77,P5:8.4,P10:10.6,P25:14.2,P50:17.9,P75:21.3,P90:24.2,P95:25.9},{age:78,P5:8.2,P10:10.4,P25:14.0,P50:17.6,P75:21.1,P90:24.0,P95:25.6},{age:79,P5:8.0,P10:10.2,P25:13.8,P50:17.5,P75:20.9,P90:23.8,P95:25.5},{age:80,P5:7.8,P10:10.0,P25:13.6,P50:17.3,P75:20.7,P90:23.6,P95:25.3},{age:81,P5:7.6,P10:9.9,P25:13.4,P50:17.1,P75:20.5,P90:23.5,P95:25.1},{age:82,P5:7.4,P10:9.7,P25:13.3,P50:17.0,P75:20.4,P90:23.3,P95:25.0},{age:83,P5:7.3,P10:9.5,P25:13.1,P50:16.8,P75:20.3,P90:23.2,P95:24.9},{age:84,P5:7.1,P10:9.4,P25:13.0,P50:16.7,P75:20.1,P90:23.1,P95:24.8},{age:85,P5:7.0,P10:9.2,P25:12.8,P50:16.6,P75:20.0,P90:23.0,P95:24.7},{age:86,P5:6.8,P10:9.1,P25:12.7,P50:16.5,P75:19.9,P90:22.9,P95:24.6},{age:87,P5:6.7,P10:8.9,P25:12.6,P50:16.3,P75:19.9,P90:22.8,P95:24.6},{age:88,P5:6.6,P10:8.8,P25:12.5,P50:16.2,P75:19.8,P90:22.8,P95:24.5},{age:89,P5:6.4,P10:8.7,P25:12.3,P50:16.2,P75:19.7,P90:22.7,P95:24.5},{age:90,P5:6.3,P10:8.6,P25:12.2,P50:16.1,P75:19.6,P90:22.7,P95:24.4},{age:91,P5:6.2,P10:8.4,P25:12.1,P50:16.0,P75:19.6,P90:22.6,P95:24.4},{age:92,P5:6.1,P10:8.3,P25:12.0,P50:15.9,P75:19.5,P90:22.6,P95:24.3},{age:93,P5:6.0,P10:8.2,P25:11.9,P50:15.8,P75:19.5,P90:22.5,P95:24.3},{age:94,P5:5.9,P10:8.1,P25:11.8,P50:15.7,P75:19.4,P90:22.5,P95:24.3},{age:95,P5:5.8,P10:8.0,P25:11.7,P50:15.7,P75:19.3,P90:22.5,P95:24.3},
    ]
  }
};

function interp(data, age, f) {
  if (age <= data[0].age) return data[0][f];
  if (age >= data[data.length-1].age) return data[data.length-1][f];
  for (let i = 0; i < data.length - 1; i++) {
    if (age >= data[i].age && age <= data[i+1].age) {
      const t = (age - data[i].age) / (data[i+1].age - data[i].age);
      return data[i][f] + t * (data[i+1][f] - data[i][f]);
    }
  }
  return null;
}

function getRank(data, age, value) {
  const v = ['P5','P10','P25','P50','P75','P90','P95'].map(f => interp(data, age, f));
  if (value <= v[0]) return { rank:"< P5", color:"#c0392b", level:"Muy bajo" };
  if (value <= v[1]) return { rank:"P5–P10", color:"#e67e22", level:"Bajo" };
  if (value <= v[2]) return { rank:"P10–P25", color:"#d4a017", level:"Bajo-normal" };
  if (value <= v[3]) return { rank:"P25–P50", color:"#27ae60", level:"Normal" };
  if (value <= v[4]) return { rank:"P50–P75", color:"#27ae60", level:"Normal" };
  if (value <= v[5]) return { rank:"P75–P90", color:"#2471a3", level:"Alto" };
  if (value <= v[6]) return { rank:"P90–P95", color:"#2471a3", level:"Muy alto" };
  return { rank:"> P95", color:"#7d3c98", level:"Excepcional" };
}

function Chart({ data, age, value, title, sub, unit, clr }) {
  const n = parseFloat(value), ok = age >= 60 && age <= 95 && !isNaN(n);
  const cd = data.map(d => ({ ...d, b1:d.P25-d.P5, b2:d.P75-d.P25, b3:d.P95-d.P75 }));
  return (
    <div style={{background:'white',borderRadius:2,padding:'22px 16px 10px',border:'1px solid #e8e6df',marginBottom:16,boxShadow:'0 1px 4px rgba(0,0,0,0.04)'}}>
      <div style={{fontSize:14,fontWeight:700,color:'#1a1a2e',fontFamily:'"DM Sans",sans-serif'}}>{title}</div>
      <div style={{fontSize:11,color:'#8a8475',marginBottom:14,fontFamily:'"DM Sans",sans-serif'}}>{sub}</div>
      <ResponsiveContainer width="100%" height={290}>
        <ComposedChart data={cd} margin={{top:8,right:10,left:0,bottom:5}}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ece9e1"/>
          <XAxis dataKey="age" tick={{fontSize:11,fontFamily:'DM Sans'}} stroke="#c4bfb3" tickLine={false} label={{value:'Edad (años)',position:'bottom',offset:-2,fontSize:10,fill:'#8a8475',fontFamily:'DM Sans'}}/>
          <YAxis tick={{fontSize:11,fontFamily:'DM Sans'}} stroke="#c4bfb3" tickLine={false} label={{value:unit,angle:-90,position:'insideLeft',offset:12,fontSize:10,fill:'#8a8475',fontFamily:'DM Sans'}}/>
          <Area dataKey="P5" stackId="1" fill="transparent" stroke="none"/>
          <Area dataKey="b1" stackId="1" fill={clr+"0d"} stroke="none"/>
          <Area dataKey="b2" stackId="1" fill={clr+"18"} stroke="none"/>
          <Area dataKey="b3" stackId="1" fill={clr+"0d"} stroke="none"/>
          <Line dataKey="P5" stroke={clr+"50"} strokeWidth={1} strokeDasharray="6 3" dot={false}/>
          <Line dataKey="P25" stroke={clr+"70"} strokeWidth={1} strokeDasharray="3 3" dot={false}/>
          <Line dataKey="P50" stroke={clr} strokeWidth={2.5} dot={false}/>
          <Line dataKey="P75" stroke={clr+"70"} strokeWidth={1} strokeDasharray="3 3" dot={false}/>
          <Line dataKey="P95" stroke={clr+"50"} strokeWidth={1} strokeDasharray="6 3" dot={false}/>
          {ok && <ReferenceDot x={age} y={n} r={6} fill="#c0392b" stroke="white" strokeWidth={2.5}/>}
          {ok && <ReferenceLine x={age} stroke="#c0392b33" strokeDasharray="4 4"/>}
          <Tooltip contentStyle={{fontSize:12,borderRadius:2,border:'1px solid #e8e6df',fontFamily:'DM Sans'}} formatter={(v,nm)=>[typeof v==='number'?v.toFixed(2):v,nm]} labelFormatter={v=>`${v} años`}/>
        </ComposedChart>
      </ResponsiveContainer>
      <div style={{display:'flex',justifyContent:'center',gap:14,fontSize:10,color:'#8a8475',marginTop:4,fontFamily:'"DM Sans",sans-serif'}}>
        <span>╌ P5</span><span>┈ P25</span><span style={{fontWeight:700,color:clr}}>━ P50 (mediana)</span><span>┈ P75</span><span>╌ P95</span>
        {ok&&<span style={{color:'#c0392b',fontWeight:700}}>● Paciente</span>}
      </div>
    </div>
  );
}

export default function App() {
  const [sex, setSex] = useState("Hombres");
  const [age, setAge] = useState("");
  const [vel, setVel] = useState("");
  const [grip, setGrip] = useState("");

  const a = parseInt(age), vn = parseFloat(vel), gn = parseFloat(grip);
  const ok = a >= 60 && a <= 95 && (vel || grip);
  const ew = sex === "Hombres" ? 27 : 16;
  const vd = DATA.vel[sex], gd = DATA.grip[sex];
  const vr = vel && ok ? getRank(vd, a, vn) : null;
  const gr = grip && ok ? getRank(gd, a, gn) : null;
  const vm = vel && ok ? interp(vd, a, 'P50') : null;
  const gm = grip && ok ? interp(gd, a, 'P50') : null;

  const sb = (on) => ({flex:1,padding:'10px 0',borderRadius:2,border:on?'2px solid #1a1a2e':'1px solid #d4d0c8',cursor:'pointer',fontSize:13,fontWeight:600,transition:'all 0.15s',background:on?'#1a1a2e':'white',color:on?'white':'#5a5548',fontFamily:'"DM Sans",sans-serif'});
  const is = {width:'100%',padding:'10px 14px',borderRadius:2,border:'1px solid #d4d0c8',fontSize:15,boxSizing:'border-box',outline:'none',fontFamily:'"Crimson Pro",Georgia,serif'};

  return (
    <div style={{minHeight:'100vh',background:'#f7f7f2',fontFamily:'"Crimson Pro",Georgia,serif'}}>
      <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>

      <div style={{background:'#1a1a2e',padding:'0 24px',display:'flex',alignItems:'center',height:46}}>
        <span style={{color:'#e8d5b7',fontSize:12,fontWeight:600,letterSpacing:3,textTransform:'uppercase',fontFamily:'"DM Sans",sans-serif'}}>ENASEM · Clinical Calculator</span>
      </div>

      <div style={{background:'linear-gradient(175deg,#1a1a2e 0%,#16213e 60%,#0f3460 100%)',padding:'48px 24px 40px',color:'white',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,opacity:0.03,backgroundImage:'radial-gradient(circle at 25% 50%,white 1px,transparent 1px)',backgroundSize:'30px 30px'}}/>
        <div style={{maxWidth:720,margin:'0 auto',position:'relative',zIndex:1}}>
          <h1 style={{fontSize:30,fontWeight:700,lineHeight:1.25,margin:0}}>Valores Normativos para<br/>Adultos Mayores Mexicanos</h1>
          <p style={{fontSize:14,opacity:0.65,marginTop:10,lineHeight:1.6,fontFamily:'"DM Sans",sans-serif'}}>Velocidad de marcha y fuerza de prensión manual · Curvas percentilares LMS (BCCGo)<br/>Estudio Nacional de Salud y Envejecimiento en México, 2012</p>
          <div style={{width:50,height:3,background:'linear-gradient(90deg,#e8d5b7,#c9a96e)',borderRadius:2,marginTop:14}}/>
        </div>
      </div>

      <div style={{maxWidth:720,margin:'0 auto',padding:'24px 16px 60px'}}>
        {/* Inputs */}
        <div style={{background:'white',borderRadius:2,padding:'24px 28px',marginBottom:20,boxShadow:'0 1px 4px rgba(0,0,0,0.04)',border:'1px solid #e8e6df'}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:2.5,textTransform:'uppercase',color:'#8a8475',marginBottom:14,fontFamily:'"DM Sans",sans-serif',borderBottom:'1px solid #e8e6df',paddingBottom:10}}>Datos del paciente</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:14}}>
            <div>
              <div style={{fontSize:12,color:'#5a5548',fontWeight:600,marginBottom:5,fontFamily:'"DM Sans",sans-serif'}}>Sexo</div>
              <div style={{display:'flex',gap:5}}>
                {["Hombres","Mujeres"].map(s=><button key={s} onClick={()=>setSex(s)} style={sb(sex===s)}>{s==="Hombres"?"♂ H":"♀ M"}</button>)}
              </div>
            </div>
            <div>
              <label style={{fontSize:12,color:'#5a5548',fontWeight:600,display:'block',marginBottom:5,fontFamily:'"DM Sans",sans-serif'}}>Edad (años)</label>
              <input type="number" min="60" max="95" value={age} onChange={e=>setAge(e.target.value)} placeholder="60–95" style={is}/>
            </div>
            <div>
              <label style={{fontSize:12,color:'#5a5548',fontWeight:600,display:'block',marginBottom:5,fontFamily:'"DM Sans",sans-serif'}}>Vel. marcha (m/s)</label>
              <input type="number" step="0.01" value={vel} onChange={e=>setVel(e.target.value)} placeholder="ej. 0.85" style={is}/>
            </div>
            <div>
              <label style={{fontSize:12,color:'#5a5548',fontWeight:600,display:'block',marginBottom:5,fontFamily:'"DM Sans",sans-serif'}}>Fuerza prensión (kg)</label>
              <input type="number" step="0.5" value={grip} onChange={e=>setGrip(e.target.value)} placeholder="ej. 28" style={is}/>
            </div>
          </div>
        </div>

        {ok ? (<>
          {/* Results */}
          <div style={{background:'white',borderRadius:2,padding:'24px 28px',marginBottom:20,boxShadow:'0 1px 4px rgba(0,0,0,0.04)',border:'1px solid #e8e6df'}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:2.5,textTransform:'uppercase',color:'#8a8475',marginBottom:16,fontFamily:'"DM Sans",sans-serif',borderBottom:'1px solid #e8e6df',paddingBottom:10}}>Interpretación clínica</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
              {vr&&<div style={{borderLeft:`4px solid ${vr.color}`,paddingLeft:20}}>
                <div style={{fontSize:42,fontWeight:700,color:'#1a1a2e',lineHeight:1}}>{vn.toFixed(2)}<span style={{fontSize:14,color:'#8a8475',marginLeft:4}}>m/s</span></div>
                <div style={{fontSize:13,color:'#5a5548',fontWeight:600,marginTop:3,fontFamily:'"DM Sans",sans-serif'}}>Velocidad de marcha</div>
                <div style={{fontSize:12,color:vr.color,fontWeight:700,marginTop:4,fontFamily:'"DM Sans",sans-serif'}}>{vr.rank} — {vr.level}</div>
                <div style={{fontSize:12,color:'#8a8475',marginTop:2,fontFamily:'"DM Sans",sans-serif'}}>Mediana esperada: {vm.toFixed(2)} m/s ({((vn-vm)/vm*100).toFixed(0)}%)</div>
              </div>}
              {gr&&<div style={{borderLeft:`4px solid ${gr.color}`,paddingLeft:20}}>
                <div style={{fontSize:42,fontWeight:700,color:'#1a1a2e',lineHeight:1}}>{gn.toFixed(0)}<span style={{fontSize:14,color:'#8a8475',marginLeft:4}}>kg</span></div>
                <div style={{fontSize:13,color:'#5a5548',fontWeight:600,marginTop:3,fontFamily:'"DM Sans",sans-serif'}}>Fuerza de prensión</div>
                <div style={{fontSize:12,color:gr.color,fontWeight:700,marginTop:4,fontFamily:'"DM Sans",sans-serif'}}>{gr.rank} — {gr.level}</div>
                <div style={{fontSize:12,color:'#8a8475',marginTop:2,fontFamily:'"DM Sans",sans-serif'}}>Mediana esperada: {gm.toFixed(1)} kg ({((gn-gm)/gm*100).toFixed(0)}%)</div>
              </div>}
            </div>
          </div>

          {/* Alerts */}
          {((!isNaN(vn)&&vn<0.8)||(!isNaN(gn)&&gn>0&&gn<ew))&&(
            <div style={{background:'#fef5f5',border:'1px solid #f0c6c6',borderLeft:'4px solid #c0392b',borderRadius:2,padding:'14px 20px',marginBottom:20}}>
              <div style={{fontSize:11,fontWeight:700,color:'#c0392b',marginBottom:6,fontFamily:'"DM Sans",sans-serif',textTransform:'uppercase',letterSpacing:1}}>Alerta clínica</div>
              {!isNaN(vn)&&vn<0.8&&<div style={{fontSize:14,color:'#5a3030',lineHeight:1.5}}>Velocidad &lt; 0.8 m/s — fragilidad y riesgo de dependencia <span style={{fontSize:11,color:'#8a7060'}}>(Studenski, 2011)</span></div>}
              {!isNaN(gn)&&gn>0&&gn<ew&&<div style={{fontSize:14,color:'#5a3030',lineHeight:1.5,marginTop:3}}>Prensión &lt; {ew} kg — sarcopenia probable EWGSOP2 <span style={{fontSize:11,color:'#8a7060'}}>(Cruz-Jentoft et al., 2019)</span></div>}
            </div>
          )}

          {vel&&<Chart data={vd} age={a} value={vel} title="Velocidad de la marcha" sub={`Percentiles LMS — ${sex}`} unit="m/s" clr="#2c3e50"/>}
          {grip&&<Chart data={gd} age={a} value={grip} title="Fuerza de prensión manual" sub={`Percentiles LMS — ${sex}`} unit="kg" clr="#1a5276"/>}
        </>) : (
          <div style={{textAlign:'center',padding:'56px 20px',color:'#8a8475'}}>
            <div style={{fontSize:13,fontWeight:600,letterSpacing:1.5,fontFamily:'"DM Sans",sans-serif',textTransform:'uppercase',opacity:0.5,marginBottom:8}}>Ingrese datos del paciente</div>
            <div style={{fontSize:14,color:'#a09a8e'}}>Edad (60–95 años) y al menos una medición funcional</div>
          </div>
        )}

        {/* Footer */}
        <div style={{borderTop:'1px solid #e8e6df',paddingTop:20,marginTop:24}}>
          <div style={{fontSize:12,color:'#8a8475',lineHeight:1.7,fontFamily:'"DM Sans",sans-serif'}}>
            <strong style={{color:'#5a5548'}}>Referencia</strong><br/>
            Alvarado-Lara MR, Pérez-Zepeda MU. Valores normativos por edad y sexo de la velocidad de la marcha y la fuerza de prensión en personas mayores mexicanas: análisis secundario del ENASEM 2012. Tesis de Maestría, Hospital General "Dr. Manuel Gea González", 2026.
          </div>
          <div style={{fontSize:12,color:'#8a8475',lineHeight:1.7,fontFamily:'"DM Sans",sans-serif',marginTop:12,paddingTop:12,borderTop:'1px solid #e8e6df'}}>
            <strong style={{color:'#5a5548'}}>Metodología</strong><br/>
            Datos: ENASEM 2012 (n = 1,099; 486 hombres, 613 mujeres, ≥60 años). Percentiles suavizados con método LMS (BCCGo, P-splines) usando gamlss en R. Umbrales EWGSOP2: &lt;27 kg hombres, &lt;16 kg mujeres.
          </div>
          <div style={{fontSize:11,color:'#a09a8e',lineHeight:1.6,fontFamily:'"DM Sans",sans-serif',marginTop:12}}>
            Herramienta de apoyo clínico. No sustituye el juicio médico. Valores de referencia para población mexicana ≥60 años.
          </div>
        </div>
      </div>
    </div>
  );
}
