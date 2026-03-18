import { useState, useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, ReferenceLine, Area, ComposedChart } from "recharts";

// LMS percentile data from ENASEM 2012 (gamlss BCCGo) — year by year
const DATA = {
  vel: {
    Hombres: [
      {age:60,P5:0.708,P10:0.832,P25:1.007,P50:1.162,P75:1.289,P90:1.387,P95:1.440},
      {age:61,P5:0.674,P10:0.803,P25:0.986,P50:1.150,P75:1.283,P90:1.385,P95:1.441},
      {age:62,P5:0.644,P10:0.775,P25:0.967,P50:1.138,P75:1.277,P90:1.384,P95:1.441},
      {age:63,P5:0.617,P10:0.751,P25:0.948,P50:1.127,P75:1.272,P90:1.382,P95:1.442},
      {age:64,P5:0.594,P10:0.728,P25:0.930,P50:1.114,P75:1.265,P90:1.379,P95:1.440},
      {age:65,P5:0.573,P10:0.706,P25:0.912,P50:1.101,P75:1.256,P90:1.374,P95:1.437},
      {age:66,P5:0.554,P10:0.686,P25:0.894,P50:1.088,P75:1.246,P90:1.367,P95:1.432},
      {age:67,P5:0.537,P10:0.668,P25:0.876,P50:1.074,P75:1.236,P90:1.359,P95:1.425},
      {age:68,P5:0.521,P10:0.651,P25:0.859,P50:1.059,P75:1.224,P90:1.349,P95:1.416},
      {age:69,P5:0.507,P10:0.635,P25:0.843,P50:1.044,P75:1.211,P90:1.338,P95:1.406},
      {age:70,P5:0.494,P10:0.620,P25:0.827,P50:1.029,P75:1.198,P90:1.326,P95:1.394},
      {age:71,P5:0.481,P10:0.605,P25:0.811,P50:1.014,P75:1.183,P90:1.313,P95:1.382},
      {age:72,P5:0.469,P10:0.591,P25:0.795,P50:0.998,P75:1.168,P90:1.297,P95:1.367},
      {age:73,P5:0.457,P10:0.577,P25:0.778,P50:0.980,P75:1.150,P90:1.280,P95:1.349},
      {age:74,P5:0.445,P10:0.563,P25:0.761,P50:0.961,P75:1.131,P90:1.260,P95:1.329},
      {age:75,P5:0.434,P10:0.548,P25:0.743,P50:0.942,P75:1.110,P90:1.239,P95:1.307},
      {age:76,P5:0.422,P10:0.534,P25:0.726,P50:0.922,P75:1.088,P90:1.216,P95:1.285},
      {age:77,P5:0.411,P10:0.521,P25:0.709,P50:0.902,P75:1.067,P90:1.194,P95:1.262},
      {age:78,P5:0.401,P10:0.509,P25:0.693,P50:0.884,P75:1.047,P90:1.173,P95:1.240},
      {age:79,P5:0.392,P10:0.498,P25:0.679,P50:0.867,P75:1.029,P90:1.154,P95:1.220},
      {age:80,P5:0.385,P10:0.488,P25:0.667,P50:0.853,P75:1.013,P90:1.137,P95:1.203},
      {age:81,P5:0.378,P10:0.479,P25:0.656,P50:0.840,P75:0.999,P90:1.122,P95:1.188},
      {age:82,P5:0.371,P10:0.471,P25:0.645,P50:0.828,P75:0.986,P90:1.108,P95:1.173},
      {age:83,P5:0.364,P10:0.463,P25:0.635,P50:0.815,P75:0.971,P90:1.092,P95:1.157},
      {age:84,P5:0.357,P10:0.454,P25:0.623,P50:0.800,P75:0.955,P90:1.074,P95:1.138},
      {age:85,P5:0.349,P10:0.444,P25:0.610,P50:0.784,P75:0.936,P90:1.054,P95:1.117},
      {age:86,P5:0.341,P10:0.433,P25:0.595,P50:0.767,P75:0.916,P90:1.032,P95:1.094},
      {age:87,P5:0.332,P10:0.422,P25:0.580,P50:0.748,P75:0.894,P90:1.007,P95:1.068},
      {age:88,P5:0.323,P10:0.410,P25:0.565,P50:0.728,P75:0.871,P90:0.982,P95:1.041},
      {age:89,P5:0.313,P10:0.398,P25:0.548,P50:0.707,P75:0.847,P90:0.955,P95:1.013},
      {age:90,P5:0.304,P10:0.386,P25:0.532,P50:0.686,P75:0.822,P90:0.927,P95:0.984},
      {age:91,P5:0.294,P10:0.374,P25:0.515,P50:0.665,P75:0.797,P90:0.899,P95:0.954},
      {age:92,P5:0.284,P10:0.361,P25:0.498,P50:0.643,P75:0.771,P90:0.871,P95:0.924},
      {age:93,P5:0.275,P10:0.349,P25:0.482,P50:0.622,P75:0.747,P90:0.843,P95:0.895},
      {age:94,P5:0.265,P10:0.338,P25:0.466,P50:0.602,P75:0.722,P90:0.816,P95:0.866},
      {age:95,P5:0.256,P10:0.326,P25:0.450,P50:0.582,P75:0.699,P90:0.789,P95:0.838},
    ],
    Mujeres: [
      {age:60,P5:0.575,P10:0.658,P25:0.805,P50:0.977,P75:1.159,P90:1.331,P95:1.437},
      {age:61,P5:0.558,P10:0.641,P25:0.788,P50:0.960,P75:1.143,P90:1.314,P95:1.421},
      {age:62,P5:0.541,P10:0.624,P25:0.771,P50:0.944,P75:1.126,P90:1.299,P95:1.405},
      {age:63,P5:0.525,P10:0.608,P25:0.754,P50:0.927,P75:1.110,P90:1.283,P95:1.390},
      {age:64,P5:0.509,P10:0.592,P25:0.738,P50:0.911,P75:1.094,P90:1.268,P95:1.375},
      {age:65,P5:0.493,P10:0.576,P25:0.722,P50:0.895,P75:1.079,P90:1.252,P95:1.360},
      {age:66,P5:0.478,P10:0.560,P25:0.706,P50:0.879,P75:1.064,P90:1.238,P95:1.346},
      {age:67,P5:0.462,P10:0.545,P25:0.691,P50:0.864,P75:1.049,P90:1.223,P95:1.331},
      {age:68,P5:0.448,P10:0.530,P25:0.675,P50:0.849,P75:1.034,P90:1.209,P95:1.318},
      {age:69,P5:0.433,P10:0.515,P25:0.661,P50:0.834,P75:1.019,P90:1.195,P95:1.304},
      {age:70,P5:0.419,P10:0.500,P25:0.646,P50:0.820,P75:1.005,P90:1.181,P95:1.291},
      {age:71,P5:0.405,P10:0.486,P25:0.631,P50:0.805,P75:0.991,P90:1.168,P95:1.278},
      {age:72,P5:0.391,P10:0.472,P25:0.617,P50:0.791,P75:0.978,P90:1.155,P95:1.265},
      {age:73,P5:0.377,P10:0.458,P25:0.603,P50:0.778,P75:0.964,P90:1.142,P95:1.252},
      {age:74,P5:0.364,P10:0.445,P25:0.590,P50:0.764,P75:0.951,P90:1.129,P95:1.240},
      {age:75,P5:0.351,P10:0.431,P25:0.576,P50:0.751,P75:0.938,P90:1.117,P95:1.228},
      {age:76,P5:0.338,P10:0.418,P25:0.563,P50:0.738,P75:0.925,P90:1.104,P95:1.216},
      {age:77,P5:0.326,P10:0.406,P25:0.550,P50:0.725,P75:0.913,P90:1.092,P95:1.204},
      {age:78,P5:0.313,P10:0.393,P25:0.537,P50:0.712,P75:0.900,P90:1.081,P95:1.193},
      {age:79,P5:0.302,P10:0.381,P25:0.525,P50:0.700,P75:0.888,P90:1.069,P95:1.182},
      {age:80,P5:0.290,P10:0.369,P25:0.512,P50:0.687,P75:0.877,P90:1.058,P95:1.171},
      {age:81,P5:0.278,P10:0.357,P25:0.500,P50:0.675,P75:0.865,P90:1.047,P95:1.161},
      {age:82,P5:0.267,P10:0.345,P25:0.488,P50:0.664,P75:0.854,P90:1.036,P95:1.150},
      {age:83,P5:0.256,P10:0.334,P25:0.477,P50:0.652,P75:0.842,P90:1.025,P95:1.140},
      {age:84,P5:0.246,P10:0.323,P25:0.465,P50:0.641,P75:0.831,P90:1.015,P95:1.130},
      {age:85,P5:0.235,P10:0.312,P25:0.454,P50:0.630,P75:0.821,P90:1.005,P95:1.120},
      {age:86,P5:0.225,P10:0.301,P25:0.443,P50:0.619,P75:0.810,P90:0.995,P95:1.111},
      {age:87,P5:0.215,P10:0.291,P25:0.432,P50:0.608,P75:0.800,P90:0.985,P95:1.101},
      {age:88,P5:0.205,P10:0.281,P25:0.422,P50:0.597,P75:0.790,P90:0.976,P95:1.092},
      {age:89,P5:0.196,P10:0.271,P25:0.411,P50:0.587,P75:0.780,P90:0.966,P95:1.083},
      {age:90,P5:0.187,P10:0.261,P25:0.401,P50:0.577,P75:0.770,P90:0.957,P95:1.075},
      {age:91,P5:0.178,P10:0.252,P25:0.391,P50:0.567,P75:0.760,P90:0.948,P95:1.066},
      {age:92,P5:0.170,P10:0.243,P25:0.382,P50:0.557,P75:0.751,P90:0.939,P95:1.058},
      {age:93,P5:0.162,P10:0.234,P25:0.372,P50:0.547,P75:0.742,P90:0.931,P95:1.050},
      {age:94,P5:0.154,P10:0.225,P25:0.363,P50:0.538,P75:0.733,P90:0.922,P95:1.042},
      {age:95,P5:0.146,P10:0.216,P25:0.354,P50:0.529,P75:0.724,P90:0.914,P95:1.034},
    ]
  },
  grip: {
    Hombres: [
      {age:60,P5:22.4,P10:25.4,P25:30.0,P50:34.9,P75:39.6,P90:43.7,P95:46.1},
      {age:61,P5:21.9,P10:24.8,P25:29.4,P50:34.4,P75:39.1,P90:43.1,P95:45.5},
      {age:62,P5:21.3,P10:24.2,P25:28.9,P50:33.8,P75:38.5,P90:42.6,P95:45.0},
      {age:63,P5:20.7,P10:23.7,P25:28.3,P50:33.3,P75:38.0,P90:42.0,P95:44.4},
      {age:64,P5:20.2,P10:23.1,P25:27.8,P50:32.7,P75:37.4,P90:41.5,P95:43.9},
      {age:65,P5:19.7,P10:22.6,P25:27.3,P50:32.2,P75:36.9,P90:41.0,P95:43.3},
      {age:66,P5:19.1,P10:22.1,P25:26.8,P50:31.7,P75:36.4,P90:40.4,P95:42.8},
      {age:67,P5:18.6,P10:21.6,P25:26.3,P50:31.2,P75:35.9,P90:39.9,P95:42.3},
      {age:68,P5:18.1,P10:21.1,P25:25.7,P50:30.7,P75:35.4,P90:39.4,P95:41.8},
      {age:69,P5:17.6,P10:20.6,P25:25.3,P50:30.2,P75:34.9,P90:38.9,P95:41.3},
      {age:70,P5:17.1,P10:20.1,P25:24.8,P50:29.7,P75:34.4,P90:38.4,P95:40.8},
      {age:71,P5:16.6,P10:19.6,P25:24.3,P50:29.2,P75:33.9,P90:38.0,P95:40.3},
      {age:72,P5:16.1,P10:19.1,P25:23.8,P50:28.8,P75:33.4,P90:37.5,P95:39.8},
      {age:73,P5:15.7,P10:18.6,P25:23.4,P50:28.3,P75:33.0,P90:37.0,P95:39.4},
      {age:74,P5:15.2,P10:18.2,P25:22.9,P50:27.8,P75:32.5,P90:36.6,P95:38.9},
      {age:75,P5:14.7,P10:17.7,P25:22.5,P50:27.4,P75:32.1,P90:36.1,P95:38.4},
      {age:76,P5:14.3,P10:17.3,P25:22.0,P50:27.0,P75:31.6,P90:35.7,P95:38.0},
      {age:77,P5:13.9,P10:16.9,P25:21.6,P50:26.5,P75:31.2,P90:35.2,P95:37.6},
      {age:78,P5:13.4,P10:16.4,P25:21.2,P50:26.1,P75:30.8,P90:34.8,P95:37.1},
      {age:79,P5:13.0,P10:16.0,P25:20.8,P50:25.7,P75:30.4,P90:34.4,P95:36.7},
      {age:80,P5:12.6,P10:15.6,P25:20.4,P50:25.3,P75:29.9,P90:33.9,P95:36.3},
      {age:81,P5:12.2,P10:15.2,P25:20.0,P50:24.9,P75:29.5,P90:33.5,P95:35.9},
      {age:82,P5:11.8,P10:14.8,P25:19.6,P50:24.5,P75:29.1,P90:33.1,P95:35.5},
      {age:83,P5:11.5,P10:14.4,P25:19.2,P50:24.1,P75:28.7,P90:32.7,P95:35.1},
      {age:84,P5:11.1,P10:14.1,P25:18.8,P50:23.7,P75:28.4,P90:32.4,P95:34.7},
      {age:85,P5:10.7,P10:13.7,P25:18.4,P50:23.3,P75:28.0,P90:32.0,P95:34.3},
      {age:86,P5:10.4,P10:13.3,P25:18.1,P50:23.0,P75:27.6,P90:31.6,P95:33.9},
      {age:87,P5:10.1,P10:13.0,P25:17.7,P50:22.6,P75:27.2,P90:31.2,P95:33.5},
      {age:88,P5:9.7,P10:12.6,P25:17.4,P50:22.3,P75:26.9,P90:30.9,P95:33.2},
      {age:89,P5:9.4,P10:12.3,P25:17.0,P50:21.9,P75:26.5,P90:30.5,P95:32.8},
      {age:90,P5:9.1,P10:12.0,P25:16.7,P50:21.6,P75:26.2,P90:30.1,P95:32.4},
      {age:91,P5:8.8,P10:11.7,P25:16.3,P50:21.2,P75:25.8,P90:29.8,P95:32.1},
      {age:92,P5:8.5,P10:11.4,P25:16.0,P50:20.9,P75:25.5,P90:29.5,P95:31.7},
      {age:93,P5:8.2,P10:11.1,P25:15.7,P50:20.6,P75:25.2,P90:29.1,P95:31.4},
      {age:94,P5:8.0,P10:10.8,P25:15.4,P50:20.3,P75:24.9,P90:28.8,P95:31.1},
      {age:95,P5:7.7,P10:10.5,P25:15.1,P50:20.0,P75:24.5,P90:28.5,P95:30.7},
    ],
    Mujeres: [
      {age:60,P5:13.3,P10:15.6,P25:19.3,P50:23.1,P75:26.6,P90:29.7,P95:31.5},
      {age:61,P5:12.9,P10:15.3,P25:18.9,P50:22.7,P75:26.2,P90:29.3,P95:31.0},
      {age:62,P5:12.6,P10:14.9,P25:18.5,P50:22.3,P75:25.8,P90:28.9,P95:30.6},
      {age:63,P5:12.2,P10:14.6,P25:18.2,P50:21.9,P75:25.4,P90:28.5,P95:30.2},
      {age:64,P5:11.9,P10:14.2,P25:17.8,P50:21.6,P75:25.1,P90:28.1,P95:29.8},
      {age:65,P5:11.6,P10:13.9,P25:17.5,P50:21.2,P75:24.7,P90:27.7,P95:29.4},
      {age:66,P5:11.3,P10:13.6,P25:17.2,P50:20.9,P75:24.4,P90:27.4,P95:29.1},
      {age:67,P5:11.0,P10:13.3,P25:16.9,P50:20.6,P75:24.0,P90:27.0,P95:28.7},
      {age:68,P5:10.7,P10:13.0,P25:16.6,P50:20.3,P75:23.7,P90:26.7,P95:28.4},
      {age:69,P5:10.4,P10:12.7,P25:16.3,P50:20.0,P75:23.4,P90:26.4,P95:28.1},
      {age:70,P5:10.1,P10:12.4,P25:16.0,P50:19.7,P75:23.1,P90:26.1,P95:27.8},
      {age:71,P5:9.8,P10:12.1,P25:15.7,P50:19.4,P75:22.8,P90:25.8,P95:27.5},
      {age:72,P5:9.6,P10:11.9,P25:15.4,P50:19.1,P75:22.5,P90:25.5,P95:27.2},
      {age:73,P5:9.3,P10:11.6,P25:15.2,P50:18.8,P75:22.2,P90:25.2,P95:26.9},
      {age:74,P5:9.1,P10:11.3,P25:14.9,P50:18.6,P75:22.0,P90:24.9,P95:26.6},
      {age:75,P5:8.8,P10:11.1,P25:14.7,P50:18.3,P75:21.7,P90:24.6,P95:26.3},
      {age:76,P5:8.6,P10:10.9,P25:14.4,P50:18.1,P75:21.5,P90:24.4,P95:26.1},
      {age:77,P5:8.4,P10:10.6,P25:14.2,P50:17.9,P75:21.3,P90:24.2,P95:25.9},
      {age:78,P5:8.2,P10:10.4,P25:14.0,P50:17.6,P75:21.1,P90:24.0,P95:25.6},
      {age:79,P5:8.0,P10:10.2,P25:13.8,P50:17.5,P75:20.9,P90:23.8,P95:25.5},
      {age:80,P5:7.8,P10:10.0,P25:13.6,P50:17.3,P75:20.7,P90:23.6,P95:25.3},
      {age:81,P5:7.6,P10:9.9,P25:13.4,P50:17.1,P75:20.5,P90:23.5,P95:25.1},
      {age:82,P5:7.4,P10:9.7,P25:13.3,P50:17.0,P75:20.4,P90:23.3,P95:25.0},
      {age:83,P5:7.3,P10:9.5,P25:13.1,P50:16.8,P75:20.3,P90:23.2,P95:24.9},
      {age:84,P5:7.1,P10:9.4,P25:13.0,P50:16.7,P75:20.1,P90:23.1,P95:24.8},
      {age:85,P5:7.0,P10:9.2,P25:12.8,P50:16.6,P75:20.0,P90:23.0,P95:24.7},
      {age:86,P5:6.8,P10:9.1,P25:12.7,P50:16.5,P75:19.9,P90:22.9,P95:24.6},
      {age:87,P5:6.7,P10:8.9,P25:12.6,P50:16.3,P75:19.9,P90:22.8,P95:24.6},
      {age:88,P5:6.6,P10:8.8,P25:12.5,P50:16.2,P75:19.8,P90:22.8,P95:24.5},
      {age:89,P5:6.4,P10:8.7,P25:12.3,P50:16.2,P75:19.7,P90:22.7,P95:24.5},
      {age:90,P5:6.3,P10:8.6,P25:12.2,P50:16.1,P75:19.6,P90:22.7,P95:24.4},
      {age:91,P5:6.2,P10:8.4,P25:12.1,P50:16.0,P75:19.6,P90:22.6,P95:24.4},
      {age:92,P5:6.1,P10:8.3,P25:12.0,P50:15.9,P75:19.5,P90:22.6,P95:24.3},
      {age:93,P5:6.0,P10:8.2,P25:11.9,P50:15.8,P75:19.5,P90:22.5,P95:24.3},
      {age:94,P5:5.9,P10:8.1,P25:11.8,P50:15.7,P75:19.4,P90:22.5,P95:24.3},
      {age:95,P5:5.8,P10:8.0,P25:11.7,P50:15.7,P75:19.3,P90:22.5,P95:24.3},
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
            <strong style={{color:'#64748b'}}>Referencia:</strong> Alvarado-Lara MR, Pérez-Zepeda MU. Valores normativos por edad y sexo de la velocidad de la marcha y la fuerza de prensión en personas mayores mexicanas. Tesis de Maestría, 2026. Datos: ENASEM 2012 (n=1,099). Método: LMS (BCCGo) con gamlss.
            <br/><strong style={{color:'#64748b'}}>Nota:</strong> Esta herramienta es de apoyo clínico y no sustituye el juicio médico. Los valores de referencia corresponden a población mexicana de 60 años o más.
          </div>
        </div>
      </div>
    </div>
  );
}
