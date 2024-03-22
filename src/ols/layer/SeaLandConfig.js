export let styleRules = {
  GeomorphyPoint: {
    type: 'point',
    styletype: 'image',
    field: 'FractureType',
    rules: {
      '114110': {
        image: 'icon/1-1.png',
        scale: 1
      },
      '114120': {
        image: 'icon/1-2.png',
        scale: 1
      },
      '114130': {
        image: 'icon/1-3.png',
        scale: 1
      },
      '114140': {
        image: 'icon/1-4.png',
        scale: 1
      },
      '114150': {
        image: 'icon/1-5.png',
        scale: 1
      },
      '114160': {
        image: 'icon/1-6.png',
        scale: 1
      },
      '114170': {
        image: 'icon/1-7.png',
        scale: 1
      },
      '114190': {
        image: 'icon/1-8.png',
        scale: 1
      },
      '114200': {
        image: 'icon/1-9.png',
        scale: 1
      },
      '114210': {
        image: 'icon/1-10.png',
        scale: 1
      },
    }
  },
  StraAttitude: {
    type: 'point',
    styletype: 'image',
    field: 'StraAttitudeType',
    rules: {
      'ISAT': {
        image: 'icon/2-1.png',
        scale: 1
      },
      'NSAT': {
        image: 'icon/2-2.png',
        scale: 1
      },
      'SSAT': {
        image: 'icon/2-3.png',
        scale: 1
      },
    }
  },
  RockLine: {
    type: 'line',
    field: '',
    rules: {
      'default': {
        color: '#000000',
        width: 1,
      },
    }
  },
  StratigraphyLine: {
    type: 'line',
    field: 'GeologyBoundaryLine',
    rules: {
      '152300': {
        color: '#000000',
        lineDash: [4, 3],
        width: 1,
      },
      '152200': {
        lineDash: [1, 6],
        color: '#000000',
        width: 3,
      },
      '': {
        color: '#000000',
        width: 1,
      },
    }
  },
  StraIsoline_B: {
    type: 'line',
    field: 'StraiName',
    rules: {
      '新近系等厚线': {
        color: '#000000',
        width: 1,
        lineDash: [8, 2],
      },
      '第四系+新近系等厚线': {
        color: '#000000',
        width: 1,
        lineDash: [6, 2, 1, 2],
      },
      '第四系等厚线': {
        color: '#000000',
        width: 1,
        lineDash: [4, 3],
      },
    }
  },
  GeomorphyLine: {
    type: 'line',
    field: 'FractureType',
    rules: {
      '114120': {
        color: '#ff00c5',
        lineDash: [10,4,2,4,2,4],
        width: 1,
      },
      '114110': {
        color: '#ff00c5',
        lineDash: [15, 5],
        width: 1,
      },
      '114200': {
        color: '#ff00c5',
        lineDash: [10, 4, 2, 4],
        width: 1,
      },
      '114160': {
        color: '#ff00c5',
        width: 1,
        lineDash: [5, 2],
      },
    }
  },
  RSInterpretationLine: {
    type: 'line',
    field: '',
    rules: {
      'default': {
        color: '#55ff00',
        width: 2,
      },
    }
  },
  ImageIndexLayer: {
    type: 'polygon',
    field: '',
    rules: {
      'default': {
        fill: 'rgba(255, 255, 255, 0)',
        stroke: '#0070ff',
        width: 1,
      },
    }
  },
  MaterialPolygonLayer_B: {
    type: 'polygon',
    field: 'CommentInfo',
    rules: {
      '地理底图类': {
        fill: 'rgba(255, 255, 255, 0)',
        stroke: '#00c5ff',
        width: 1,
      },
      '地质底图类': {
        fill: 'rgba(255, 255, 255, 0)',
        stroke: '#ffaa00',
        width: 1,
      }
    }
  },
  Stratigraphy: {
    type: 'polygon',
    field: 'Symbol',
    rules: {
      "10000000": {
        fill: "#E8D9DE",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "AR"
      },
      "11000000": {
        fill: "#F595B0",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Ar[0]"
      },
      "12000000": {
        fill: "#FCB6C2",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Ar[1]"
      },
      "13000000": {
        fill: "#FFC4D2",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Ar[2]"
      },
      "14000000": {
        fill: "#F2D3D7",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Ar[3]"
      },
      "20000000": {
        fill: "#F08F75",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "PT"
      },
      "21000000": {
        fill: "#F59D6E",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Pt[1]"
      },
      "21100000": {
        fill: "#F0BDAD",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Ht"
      },
      "22000000": {
        fill: "#EDA68C",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Pt[2]"
      },
      "22100000": {
        fill: "#FAB5A2",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Ch"
      },
      "22110000": {
        fill: "#FAC0AF",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Ch[1]"
      },
      "22120000": {
        fill: "#FAD2C5",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Ch[2]"
      },
      "22200000": {
        fill: "#FCC5B1",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Jx"
      },
      "22210000": {
        fill: "#FCD4C2",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Jx[1]"
      },
      "22220000": {
        fill: "#FCE1D7",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Jx[2]"
      },
      "23000000": {
        fill: "#E0B59F",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Pt[3]"
      },
      "23100000": {
        fill: "#EBAA96",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Qb"
      },
      "23110000": {
        fill: "#F5B5A2",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Qb[1]"
      },
      "23120000": {
        fill: "#FFCABA",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Qb[2]"
      },
      "23200000": {
        fill: "#FFB68F",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Nh"
      },
      "23210000": {
        fill: "#FFD1B8",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Nh[1]"
      },
      "23220000": {
        fill: "#FFE8DB",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Nh[2]"
      },
      "23300000": {
        fill: "#FA9C4A",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Z"
      },
      "23310000": {
        fill: "#FFBD94",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Z[1]"
      },
      "23310100": {
        fill: "#FFD3B8",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Z[1](1)"
      },
      "23320000": {
        fill: "#FCC5BD",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Z[2]"
      },
      "23320100": {
        fill: "#FCD5CF",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Z[2](1)"
      },
      "30000000": {
        fill: "#DF73FF",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "PH"
      },
      "31000000": {
        fill: "#91A1A1",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "P[Z]"
      },
      "31100000": {
        fill: "#91B8BF",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "ε"
      },
      "31110000": {
        fill: "#ABC4DB",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "ε[1]"
      },
      "31110100": {
        fill: "#B1CBE3",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "ε[1](1)"
      },
      "31110200": {
        fill: "#BED4E8",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "ε[1](2)"
      },
      "31110300": {
        fill: "#CCDEED",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "ε[1](3)"
      },
      "31110400": {
        fill: "#D8E4F0",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "ε[1](4)"
      },
      "31120000": {
        fill: "#A7C5CF",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "ε[2]"
      },
      "31120100": {
        fill: "#B4D3DE",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "ε[2](1)"
      },
      "31120200": {
        fill: "#C8DCE3",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "ε[2](2)"
      },
      "31120300": {
        fill: "#D1E5ED",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "ε[2](3)"
      },
      "31130000": {
        fill: "#A9C8D9",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "ε[3]"
      },
      "31130100": {
        fill: "#C1D5E8",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "ε[3](1)"
      },
      "31130200": {
        fill: "#CADFEB",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "ε[3](2)"
      },
      "31130300": {
        fill: "#DAE8F0",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "ε[3](3)"
      },
      "31200000": {
        fill: "#B5D4C4",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "O"
      },
      "31210000": {
        fill: "#9FC7C7",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "O[1]"
      },
      "31210100": {
        fill: "#BDD9D9",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "O[1](1)"
      },
      "31210200": {
        fill: "#D3E8E8",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "O[1](2)"
      },
      "31220000": {
        fill: "#B7C9C3",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "O[2]"
      },
      "31220100": {
        fill: "#CADED7",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "O[2](1)"
      },
      "31220200": {
        fill: "#DAE6E2",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "O[2](2)"
      },
      "31230000": {
        fill: "#C1DBD7",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "O[3]"
      },
      "31230100": {
        fill: "#D1E6E2",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "O[3](1)"
      },
      "31230200": {
        fill: "#D8E6E3",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "O[3](2)"
      },
      "31300000": {
        fill: "#CCEDE3",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "S"
      },
      "31310000": {
        fill: "#CDCF9F",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "S[1]"
      },
      "31310100": {
        fill: "#D7D9AD",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "S[1](1)"
      },
      "31310200": {
        fill: "#DADBC1",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "S[1](2)"
      },
      "31310300": {
        fill: "#E2E3D8",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "S[1](3)"
      },
      "31320000": {
        fill: "#DED2B4",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "S[2]"
      },
      "31320100": {
        fill: "#E6DFD1",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "S[2](1)"
      },
      "31330000": {
        fill: "#E0D6A2",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "S[3]"
      },
      "31340000": {
        fill: "#D6D3B8",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "S[4]"
      },
      "31400000": {
        fill: "#DCAE8A",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "D"
      },
      "31410000": {
        fill: "#D9B08B",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "D[1]"
      },
      "31410200": {
        fill: "#D9BFA9",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "D[1](2)"
      },
      "31410300": {
        fill: "#D9CABD",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "D[1](3)"
      },
      "31410400": {
        fill: "#E3D8CF",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "D[1](4)"
      },
      "31420000": {
        fill: "#E8BBA2",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "D[2]"
      },
      "31420100": {
        fill: "#E8CBBC",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "D[2](1)"
      },
      "31420200": {
        fill: "#F2DCD0",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "D[2](2)"
      },
      "31430000": {
        fill: "#E0C4B8",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "D[3]"
      },
      "31430100": {
        fill: "#E0CCC3",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "D[3](1)"
      },
      "31430200": {
        fill: "#E0DAD7",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "D[3](2)"
      },
      "31430400": {
        fill: "#EDE4E1",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "D[3](4)"
      },
      "31500000": {
        fill: "#F2F0ED",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "C"
      },
      "31510000": {
        fill: "#B8CCD9",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "C[1]"
      },
      "31510100": {
        fill: "#D3DDE3",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "C[1](1)"
      },
      "31510200": {
        fill: "#DAE5ED",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "C[1](2)"
      },
      "31510300": {
        fill: "#DDE8F0",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "C[1](3)"
      },
      "31520000": {
        fill: "#D5DADE",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "C[2]"
      },
      "31520100": {
        fill: "#E4E9ED",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "C[2](1)"
      },
      "31520200": {
        fill: "#E9EFF0",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "C[2](2)"
      },
      "31520300": {
        fill: "#F0F5FA",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "C[2](3)"
      },
      "31520400": {
        fill: "#F5F6F7",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "C[2](4)"
      },
      "31600000": {
        fill: "#F7CF8A",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "P"
      },
      "31610000": {
        fill: "#E8C99C",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "P[1]"
      },
      "31610100": {
        fill: "#E8D1B0",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "P[1](1)"
      },
      "31610200": {
        fill: "#F2E0BD",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "P[1](2)"
      },
      "31620000": {
        fill: "#EDC59D",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "P[2]"
      },
      "31620100": {
        fill: "#EDD4BB",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "P[2](1)"
      },
      "31620200": {
        fill: "#F7D2AD",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "P[2](2)"
      },
      "31620300": {
        fill: "#F5E1C4",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "P[2](3)"
      },
      "31620400": {
        fill: "#EDE5D5",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "P[2](4)"
      },
      "31630000": {
        fill: "#F2BD9E",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "P[3]"
      },
      "31630100": {
        fill: "#F2BD9E",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "P[3](1)"
      },
      "31630200": {
        fill: "#F2E0D6",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "P[3](2)"
      },
      "32000000": {
        fill: "#C2F7ED",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "M[Z]"
      },
      "32100000": {
        fill: "#CFB0DE",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "T"
      },
      "32110000": {
        fill: "#EDADCF",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "T[1]"
      },
      "32110100": {
        fill: "#EDADCF",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "T[1](1)"
      },
      "32110200": {
        fill: "#F5CEE2",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "T[1](2)"
      },
      "32120000": {
        fill: "#EDD1E0",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "T[2]"
      },
      "32120100": {
        fill: "#F7DAE9",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "T[2](1)"
      },
      "32120200": {
        fill: "#F7DADF",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "T[2](2)"
      },
      "32130000": {
        fill: "#FFC7DB",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "T[3]"
      },
      "32130100": {
        fill: "#FFD1E1",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "T[3](1)"
      },
      "32130200": {
        fill: "#FFD9E0",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "T[3](2)"
      },
      "32130300": {
        fill: "#FFE8EE",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "T[3](3)"
      },
      "32200000": {
        fill: "#A3D6FF",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "J"
      },
      "32210000": {
        fill: "#A9C1E8",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "J[1]"
      },
      "32210100": {
        fill: "#BECEE8",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "J[1](1)"
      },
      "32210200": {
        fill: "#CCE0FF",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "J[1](2)"
      },
      "32220000": {
        fill: "#BEBCE3",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "J[2]"
      },
      "32220100": {
        fill: "#D4D3F5",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "J[2](1)"
      },
      "32220200": {
        fill: "#E2E1FA",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "J[2](2)"
      },
      "32230000": {
        fill: "#9DCDEB",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "J[3]"
      },
      "32230100": {
        fill: "#B0DCF7",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "J[3](1)"
      },
      "32230200": {
        fill: "#BADFFF",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "J[3](2)"
      },
      "32230300": {
        fill: "#CCEBFF",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "J[3](3)"
      },
      "32300000": {
        fill: "#E4EEB1",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "K"
      },
      "32310000": {
        fill: "#C0E6B1",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "K[1]"
      },
      "32310100": {
        fill: "#C7F0B9",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "K[1](1)"
      },
      "32310200": {
        fill: "#BDF7A6",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "K[1](2)"
      },
      "32310300": {
        fill: "#C9EBBC",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "K[1](3)"
      },
      "32310400": {
        fill: "#D4E6CA",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "K[1](4)"
      },
      "32310500": {
        fill: "#D4FCD2",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "K[1](5)"
      },
      "32310600": {
        fill: "#CAE391",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "K[1](6)"
      },
      "32320000": {
        fill: "#CAE391",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "K[2]"
      },
      "32320100": {
        fill: "#D1EB96",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "K[2](1)"
      },
      "32320200": {
        fill: "#D8F29B",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "K[2](2)"
      },
      "32320300": {
        fill: "#E0EBB2",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "K[2](3)"
      },
      "32320400": {
        fill: "#E1F7AD",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "K[2](4)"
      },
      "32320500": {
        fill: "#EAF7B7",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "K[2](5)"
      },
      "32320600": {
        fill: "#ECF7D2",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "K[2](6)"
      },
      "33000000": {
        fill: "#F0E0A1",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "C[Z]"
      },
      "33100000": {
        fill: "#FFC966",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "E"
      },
      "33110000": {
        fill: "#FABF57",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "E[1]"
      },
      "33110100": {
        fill: "#F5C469",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "E[1](1)"
      },
      "33110200": {
        fill: "#FFD675",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "E[1](2)"
      },
      "33120000": {
        fill: "#FFB86E",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "E[2]"
      },
      "33120100": {
        fill: "#FFC78A",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "E[2](1)"
      },
      "33120200": {
        fill: "#FFCF9C",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "E[2](2)"
      },
      "33120300": {
        fill: "#FCD4B6",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "E[2](3)"
      },
      "33120400": {
        fill: "#F7D9AD",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "E[2](4)"
      },
      "33130000": {
        fill: "#FFCF8A",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "E[3]"
      },
      "33130100": {
        fill: "#FFC999",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "E[3](1)"
      },
      "33130200": {
        fill: "#FFD4A3",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "E[3](2)"
      },
      "33200000": {
        fill: "#FFE373",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "N"
      },
      "33210000": {
        fill: "#FFE354",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "N[1]"
      },
      "33210100": {
        fill: "#FFE870",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "N[1](1)"
      },
      "33210200": {
        fill: "#FFED8F",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "N[1](2)"
      },
      "33210300": {
        fill: "#FFF0A6",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "N[1](3)"
      },
      "33210400": {
        fill: "#FFF5BD",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "N[1](4)"
      },
      "33220000": {
        fill: "#FFE396",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "N[2]"
      },
      "33220100": {
        fill: "#FFEDBF",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "N[2](1)"
      },
      "33220200": {
        fill: "#FFE8AD",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "N[2](2)"
      },
      "33300000": {
        fill: "#FFFFB0",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Q; Q"
      },
      "33310000": {
        fill: "#FFFF78",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Qp; Qp"
      },
      "33310100": {
        fill: "#FFFF3D",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Qp-1; Q<p>(1)"
      },
      "33310120": {
        fill: "#FFFF4A",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Q<p>(1+2)"
      },
      "33310200": {
        fill: "#FFFF5E",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Qp-2; Q<p>(2)"
      },
      "33310300": {
        fill: "#FFFFA6",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Qp-3; Q<p>(3)"
      },
      "33310301": {
        fill: "#FFFF63",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Qp-3~1-al; Q<p>(3-1)"
      },
      "33310302": {
        fill: "#FFFF82",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Qp-3~2-dl; Q<p>(3-2)"
      },
      "33310303": {
        fill: "#FFFFA3",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Q[p](3-3)"
      },
      "33312300": {
        fill: "#FFFF6E",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Q<p>(3)-Qh"
      },
      "33320000": {
        fill: "#FFFFDB",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Qh; Qh"
      },
      "33320100": {
        fill: "#FFFFAB",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Qh-1-al; Q<h>(1)"
      },
      "33320120": {
        fill: "#FFFFBD",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Qh-1-2-al; Q<h>(1-2)"
      },
      "33320200": {
        fill: "#FFFFC7",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Qh-2-al; Q<h>(2)"
      },
      "33320230": {
        fill: "#FFFFD4",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Q<h>(2-3)"
      },
      "33320300": {
        fill: "#FFFFE6",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Qh-3-al-pl; Q<h>(3)"
      },
      "-33300000": {
        fill: "#DBD96E",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "AnQ"
      },
      "-33000000": {
        fill: "#B3FFBF",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "AnR"
      },
      "-31100000": {
        fill: "#E6C8FF",
        stroke: 'rgba(0,0,0,0)',
        width: 1,
        name: "Pre-ε"
      }
    }
  },
  Rock: {
    type: 'polygon',
    field: 'Symbol',
    rules: {
      '115100': {
        fill: '#d49bbd',
        stroke: 'rgba(0,0,0,0)',
        width: 1,
      },
      '115200': {
        fill: '#89b06f',
        stroke: 'rgba(0,0,0,0)',
        width: 1,
      },
      '115300': {
        fill: '#f5dee0',
        stroke: 'rgba(0,0,0,0)',
        width: 1,
      },
      '115400': {
        fill: '#fe7194',
        stroke: 'rgba(0,0,0,0)',
        width: 1,
      },
      '115500': {
        fill: '#9696ff',
        stroke: 'rgba(0,0,0,0)',
        width: 1,
      }
    }
  },
  GeomorphySvyRegion_B: {
    type: 'polygon',
    field: '',
    rules: {
      'default': {
        fill: 'rgba(255, 255, 255, 0)',
        stroke: '#a8a8a8',
        width: 1,
      },
    }
  },
  Geomorphy: {
    type: 'polygon',
    field: 'FractureType',
    rules: {
      '114140': {
        fill: '#000000',
        stroke: '#000000',
        width: 1,
      },
      '114150': {
        fill: 'rgba(0,0,0,0)',
        stroke: '#000000',
        width: 1,
      },
      '114160': {
        fill: 'rgba(0,0,0,0)',
        stroke: '#000000',
        width: 1,
      },
      '114170': { // 未知
        fill: 'rgba(0,0,0,0)',
        stroke: '#000000',
        width: 1,
        lineDash: [8, 3,3,3],
        hash: true
      },
      '114180': { // 未知
        fill: 'rgba(0,0,0,0)',
        stroke: '#000000',
        width: 1,
        lineDash: [8, 3,3,3],
        hash: true
      },
      '114190': {
        fill: '#286609',
        stroke: '#000000',
        width: 1,
        fillPattern: {
          pattern: 'sand',
          background: 'rgba(0,0,0,0)',
          size: 30,
          scale: 1,
        }
      },
      '114200': {
        fill: 'rgba(0,0,0,0)',
        stroke: '#000000',
        width: 1,
      },
      '114210': {
        fill: '#660e00',
        stroke: '#000000',
        lineDash: [5, 5],
        width: 1,
        fillPattern: {
          pattern: 'linedash',
          background: 'rgba(0,0,0,0)'
        }
      },
    }
  },
  RSInterpretationPolygon: {
    type: 'polygon',
    field: '',
    rules: {
      'default': {
        fill: 'rgba(255, 255, 255, 0)',
        stroke: '#f7c136',
        width: 2,
        lineDash: [5, 5],
      }
    }
  },
  Basin: {
    type: 'polygon',
    field: 'Feature',
    rules: {
      '1': { // 未知
        fill: 'rgba(255, 255, 255, 0)',
        stroke: '#000000',
        width: 2,
        lineDash: [10,4,2,4,2,4],
      },
      '2': { // 未知
        fill: 'rgba(255, 255, 255, 1)',
        stroke: '#000000',
        width: 2,
        lineDash: [10,4,2,4,2,4],
        fillPattern: {
          pattern: 'dot',
          background: 'rgba(0,0,0,0)',
          size: 1,
          scale: 1,
        }
      }
    }
  },
  DrillHole: {
    type: 'point',
    styletype: 'circle',
    field: '',
    rules: {
      'default': [
        {
          fillColor: '#000000',
          strokeColor: 'rgba(0,0,0,0)',
          width: 1,
          radius: 3,
        },
        {
          fillColor: 'rgba(0,0,0,0)',
          strokeColor: '#000000',
          width: 2,
          radius: 8,
        }
      ]
    }
  },
  DrillFaultPoint: {
    type: 'point',
    styletype: 'circle',
    field: '',
    rules: {
      'default': {
        fillColor: '#828282',
        strokeColor: 'rbga(0,0,0,0)',
        width: 0.5,
        radius: 4,
      }
    }
  },
  CollectedDrillHole: {
    type: 'point',
    styletype: 'circle',
    field: '',
    rules: {
      'default': [
        {
          fillColor: '#737300',
          strokeColor: 'rgba(0,0,0,0)',
          width: 1,
          radius: 3,
        },
        {
          fillColor: 'rgba(0,0,0,0)',
          strokeColor: '#737300',
          width: 2,
          radius: 8,
        }
      ]
    }
  },
  StraIsoline: {
    type: 'line',
    field: 'StraiName',
    rules: {
      '新近系等厚线': {
        stroke: '#000000',
        width: 1,
        lineDash: [15, 5],
      },
      '第四系+新近系等厚线': {
        stroke: '#000000',
        width: 1,
        lineDash: [5, 5, 1],
      },
      '第四系等厚线': {
        stroke: '#000000',
        width: 1,
        lineDash: [5, 5],
      }
    },
  },
  DrillProfile: {
    type: 'line',
    field: '',
    rules: {
      'default': {
        color: '#000000',
        width: 1,
      }
    }
  },
  MaterialPolygonLayer_D: {
    type: 'polygon',
    field: 'CommentInfo',
    rules: {
      '地理底图类': {
        fill: 'rgba(255, 255, 255, 0)',
        stroke: '#00c5ff',
        width: 1,
      },
      '地质底图类': {
        fill: 'rgba(255, 255, 255, 0)',
        stroke: '#ffaa00',
        width: 1,
      }
    }
  },
  CrustLithospericStructure: {
    type: 'point',
    styletype: 'regular',
    field: '',
    rules: {
      'default': {
        fillColor: '#000000',
        strokeColor: '#000000',
        width: 1,
        radius1: 7,
        radius2: 0,
        points: 4,
        angle: 0,
      }
    }
  },
  GeophySvyFaultPoint: {
    type: 'point',
    styletype: 'circle',
    field: '',
    rules: {
      'default': {
        fillColor: '#e600a9',
        strokeColor: '#000000',
        radius: 3,
        width: 0.5,
      }
    }
  },
  GeophySvyPoint: {
    type: 'point',
    styletype: 'circle',
    field: '',
    rules: {
      'default': {
        fillColor: '#e600a9',
        strokeColor: 'rgba(0,0,0,0)',
        radius: 2,
        width: 1,
      }
    }
  },
  GNSSStation: {
    type: 'point',
    styletype: 'circle',
    field: '',
    rules: {
      'default': [
        {
          fillColor: 'rgba(0,0,0,0)',
          strokeColor: '#000000',
          width: 1,
          radius: 4,
        },
        {
          fillColor: 'rgba(0,0,0,0)',
          strokeColor: '#000000',
          width: 1,
          radius: 8,
        }
      ]
    }
  },
  HorizontalDeformation: {
    type: 'point',
    styletype: 'regular',
    field: '',
    rules: {
      'default': {
        fillColor: 'rgba(0,0,0,0)',
        strokeColor: '#000000',
        width: 1,
        radius1: 7,
        radius2: 5,
        points: 4,
        angle: 0,
        scale: [1, 0.5]
      }
    }
  },
  ISCatalog: {
    type: 'point',
    styletype: 'circle',
    field: 'MagnitudeMl',
    condition: true,
    rules: {
      'val<2': {
        fillColor: "red",
        radius: 5,
        width: 1,
        strokeColor: "red"
      },
      'val>=2&&val<3': {
        fillColor: "red",
        radius: 7,
        width: 1,
        strokeColor: "red"
      },
      'val>=3&&val<4': {
        fillColor: "red",
        radius: 9,
        width: 1,
        strokeColor: "red"
      },
      'val>=4&&val<5': {
        fillColor: "red",
        radius: 11,
        width: 1,
        strokeColor: "red"
      },
      'val>=5&&val<6': {
        fillColor: "red",
        radius: 13,
        width: 1,
        strokeColor: "red"
      },
      'val>=6&&val<7': {
        fillColor: "red",
        radius: 15,
        width: 1,
        strokeColor: "red"
      },
      'val>=7&&val<8': {
        fillColor: "red",
        radius: 17,
        width: 1,
        strokeColor: "red"
      },
      'val>=8&&val<9': {
        fillColor: "red",
        radius: 19,
        width: 1,
        strokeColor: "red"
      },
      'val>=9&&val<10': {
        fillColor: "red",
        radius: 21,
        width: 1,
        strokeColor: "red"
      }
    }
  },
  RelocationISCatalog: {
    type: 'point',
    styletype: 'circle',
    field: '',
    rules: {
      'default': {
        fillColor: "#ff7f7f",
        radius: 5,
        width: 0.5,
        strokeColor: "#000000"
      }
    }
  },
  Station: {
    type: 'point',
    styletype: 'regular',
    field: '',
    rules: {
      'default': [{
        fillColor: '#000000',
        strokeColor: '#000000',
        width: 1,
        radius1: 1,
        points: 4,
        angle: Math.PI / 2,
      },
      {
        fillColor: 'rgba(0,0,0,0)',
        strokeColor: '#000000',
        width: 1,
        radius1: 10,
        points: 4,
        angle: Math.PI / 4,
      },
      ]
    }
  },
  StrongSeismicCatalog: {
    type: 'point',
    styletype: 'circle',
    field: 'Magnitude',
    condition: true,
    rules: {
      'val<2': {
        fillColor: "#00ff00",
        radius: 5,
        width: 1,
        strokeColor: "#00ff00"
      },
      'val>=2&&val<3': {
        fillColor: "#00ff00",
        radius: 7,
        width: 1,
        strokeColor: "#00ff00"
      },
      'val>=3&&val<4': {
        fillColor: "#00ff00",
        radius: 9,
        width: 1,
        strokeColor: "#00ff00"
      },
      'val>=4&&val<5': {
        fillColor: "#00ff00",
        radius: 11,
        width: 1,
        strokeColor: "#00ff00"
      },
      'val>=5&&val<6': {
        fillColor: "#00ff00",
        radius: 13,
        width: 1,
        strokeColor: "#00ff00"
      },
      'val>=6&&val<7': {
        fillColor: "#00ff00",
        radius: 15,
        width: 1,
        strokeColor: "#00ff00"
      },
      'val>=7&&val<8': {
        fillColor: "#00ff00",
        radius: 17,
        width: 1,
        strokeColor: "#00ff00"
      },
      'val>=8&&val<9': {
        fillColor: "#00ff00",
        radius: 19,
        width: 1,
        strokeColor: "#00ff00"
      },
      'val>=9&&val<10': {
        fillColor: "#00ff00",
        radius: 21,
        width: 1,
        strokeColor: "#00ff00"
      }
    }
  },
  Ug3DGridPoint: {
    type: 'point',
    styletype: 'image',
    field: '',
    rules: {
      'default': {
        image: 'icon/3-1.png',
        scale: 1
      },
    }
  },
  Ug3DMeshLattice: {
    type: 'point',
    styletype: 'regular',
    field: '',
    rules: {
      'default': [{
        fillColor: '#000000',
        strokeColor: '#000000',
        width: 1,
        radius1: 4,
        points: 3,
        angle: 0,
      },
      {
        fillColor: 'rgba(0,0,0,0)',
        strokeColor: '#000000',
        width: 1,
        radius1: 10,
        points: 3,
        angle: 0,
      },
      ]
    }
  },
  AviationMagnetic: {
    type: 'line',
    field: '',
    rules: {
      'default': {
        color: '#0070ff',
        width: 1,
      }
    }
  },
  CrustIsoline: {
    type: 'line',
    field: '',
    rules: {
      'default': {
        color: '#0084a8',
        width: 1,
      }
    }
  },
  GeophySvyLine: {
    type: 'line',
    field: '',
    rules: {
      'default': {
        color: '#e600a9',
        width: 3,
      }
    }
  },
  GravityField: {
    type: 'line',
    field: '',
    rules: {
      'default': {
        color: '#5c8944',
        width: 1,
      }
    }
  },
  StressField: {
    type: 'line',
    field: '',
    rules: {
      'default': {
        color: '#c500ff',
        width: 1,
      }
    }
  },
  VerticalDeformation: {
    type: 'line',
    field: '',
    rules: {
      'default': {
        color: '#55ff00',
        width: 1,
      }
    }
  },
  MaterialPolygonLayer_G: {
    type: 'polygon',
    field: 'CommentInfo',
    rules: {
      '地理底图类': {
        fill: 'rgba(255, 255, 255, 0)',
        stroke: '#00c5ff',
        width: 1,
      },
      '地质底图类': {
        fill: 'rgba(255, 255, 255, 0)',
        stroke: '#ffaa00',
        width: 1,
      }
    }
  },
  EpiMechanismResult: {
    type: 'point',
    styletype: 'image',
    field: '',
    rules: {
      'default': {
        image: 'icon/4-1.png',
        scale: 1
      },
    }
  },
  GeomorphySvyPoint: {
    type: 'point',
    styletype: 'circle',
    field: '',
    rules: {
      'default': {
        fillColor: "#a8a8a8",
        radius: 3,
        width: 0.5,
        strokeColor: "#f000000"
      }
    }
  },
  GeomorStation: {
    type: 'point',
    styletype: 'image',
    field: '',
    rules: {
      'default': {
        image: 'icon/5-1.png',
        scale: 1
      },
    }
  },
  GeomorphySvyLine: {
    type: 'line',
    field: '',
    rules: {
      'default': {
        color: '#a8a8a8',
        width: 1,
      }
    }
  },
  IsoseismalLine: {
    type: 'line',
    field: '',
    rules: {
      'default': {
        color: '#ffaa00',
        width: 1,
      }
    }
  },
  FractureBelt: {
    type: 'polygon',
    field: '',
    rules: {
      'default': {
        fill: '#ffbebe',
        stroke: '#ffbebe',
        width: 1,
        fillPattern: {
          pattern: 'hatch',
          background: 'rgba(0,0,0,0)',
          color: '#ffbebe',
          spacing: 5,
          angle: 45,
          size: 1
        }
      }
    }
  },
  GeomorphySvyRegion: {
    type: 'polygon',
    field: '',
    rules: {
      'default': {
        fill: 'rgba(255, 255, 255, 0)',
        stroke: '#a8a8a8',
        width: 1,
      }
    }
  },
  IntensityRegion: {
    type: 'polygon',
    field: '',
    rules: {
      'default': {
        fill: '#ffaa00',
        stroke: '#ffaa00',
        width: 1,
        fillPattern: {
          pattern: 'hatch',
          background: 'rgba(0,0,0,0)',
          color: '#ffaa00',
          spacing: 5,
          angle: 45,
          size: 1
        }
      }
    }
  },
  MaterialPolygonLayer_S: {
    type: 'polygon',
    field: 'CommentInfo',
    rules: {
      '地理底图类': {
        fill: 'rgba(255, 255, 255, 0)',
        stroke: '#00c5ff',
        width: 1,
      },
      '地质底图类': {
        fill: 'rgba(255, 255, 255, 0)',
        stroke: '#ffaa00',
        width: 1,
      }
    }
  },
  PotentialSourceRegion: {
    type: 'polygon',
    field: 'Mu',
    rules: {
      'default': {
        fill: '#0070ff',
        stroke: '#0070ff',
        width: 1,
        fillPattern: {
          pattern: 'hatch',
          background: 'rgba(0,0,0,0)',
          color: '#0070ff',
          spacing: 5,
          angle: 45,
          size: 1
        }
      },
      '5': {
        fill: '#ffffff',
        stroke: '#000000',
        width: 1,
      },
      '5.5': {
        fill: '#f3f6d0',
        stroke: '#000000',
        width: 1,
      },
      '6': {
        fill: '#fbe7d0',
        stroke: '#000000',
        width: 1,
      },
      '6.5': {
        fill: '#f1b77e',
        stroke: '#000000',
        width: 1,
      },
      '7': {
        fill: '#e9ae1d',
        stroke: '#000000',
        width: 1,
      },
      '7.5': {
        fill: '#c3641a',
        stroke: '#000000',
        width: 1,
      },
      '8': {
        fill: '#7b5e26',
        stroke: '#000000',
        width: 1,
      },
      '8.5': {
        fill: '#d81f1c',
        stroke: '#000000',
        width: 1,
      },
      '9': {
        fill: '#6a2367',
        stroke: '#000000',
        width: 1,
      }
    }
  },
  SeismicBelt: {
    type: 'polygon',
    field: '',
    rules: {
      'default': {
        fill: 'rgba(255, 255, 255, 0)',
        stroke: '#686868',
        width: 1.5,
        // fillPattern: {
        //   pattern: 'hatch',
        //   background: 'rgba(0,0,0,0)',
        //   color: '#ff0000',
        //   spacing: 5,
        //   angle: 45,
        //   size: 1
        // }
      }
    }
  },
  SeismicZone: {
    type: 'polygon',
    field: '',
    rules: {
      'default': {
        fill: 'rgba(255, 255, 255, 0)',
        stroke: '#000000',
        width: 3,
        // fillPattern: {
        //   pattern: 'hatch',
        //   background: 'rgba(0,0,0,0)',
        //   color: '#c500ff',
        //   spacing: 5,
        //   angle: 45,
        //   size: 1
        // }
      }
    }
  },
  StructureBackground: {
    type: 'polygon',
    field: '',
    rules: {
      'default': {
        fill: 'rgba(255, 255, 255, 0)',
        stroke: '#b2b2b2',
        width: 1,
        // fillPattern: {
        //   pattern: 'hatch',
        //   background: 'rgba(0,0,0,0)',
        //   color: '#c500ff',
        //   spacing: 5,
        //   angle: 45,
        //   size: 1
        // }
      }
    }
  },
  Fault: {
    type: 'line',
    field: 'Age',
    rules: {
      '': {
        color: '#00aa00',
        width: 1,
      },
      '-33300000': {
        color: '#000000',
        width: 1,
      },
      '33310200': {
        color: '#c500ff',
        width: 1,
      },
      '33310100': {
        color: '#c500ff',
        width: 1,
      },
      '33310000': {
        color: '#c500ff',
        width: 1,
      },
      '33300000': {
        color: '#c500ff',
        width: 1,
      },
      '33310120': {
        color: '#c500ff',
        width: 1,
      },
      '33310300': {
        color: '#ff0000',
        width: 1,
      },
      '33310302': {
        color: '#ff0000',
        width: 1,
      },
      '33310301': {
        color: '#ff0000',
        width: 1,
      },
      '33320000': {
        color: '#ff0000',
        width: 3,
      },
      '33320300': {
        color: '#ff0000',
        width: 3,
      },
      '33320200': {
        color: '#ff0000',
        width: 3,
      }
    }
  },
  Fold: {
    type: 'line',
    field: 'FoldType',
    rules: {
      '112100': {
        color: '#000000',
        width: 1,
        double: {
          type: 'point',
          location: 'middle',
          image: 'icon/6-1.png',
        }
      },
      '112200': {
        color: '#000000',
        width: 1,
        lineDash: [15, 5],
        double: {
          type: 'point',
          location: 'middle',
          image: 'icon/6-2.png'
        }
      }
    }
  },
  FaultAttitude: {
    type: 'point',
    field: 'Feature',
    styletype: 'image',
    // condition: true,
    rules: {
      '111301': {
        image: 'icon/7-1.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111201': {
        image: 'icon/7-1.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111101': {
        image: 'icon/7-1.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },


      '111104': {
        image: 'icon/7-2.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },


      '111110': {
        image: 'icon/7-3.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111115': {
        image: 'icon/7-3.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111116': {
        image: 'icon/7-3.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111310': {
        image: 'icon/7-3.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111210': {
        image: 'icon/7-3.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },


      '111312': {
        image: 'icon/7-4.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111212': {
        image: 'icon/7-4.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111112': {
        image: 'icon/7-4.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },


      '111113': {
        image: 'icon/7-5.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111213': {
        image: 'icon/7-5.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111313': {
        image: 'icon/7-5.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },


      '111220': {
        image: 'icon/7-6.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111120': {
        image: 'icon/7-6.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111126': {
        image: 'icon/7-6.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111125': {
        image: 'icon/7-6.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111320': {
        image: 'icon/7-6.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111127': {
        image: 'icon/7-6.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },


      '111121': {
        image: 'icon/7-7.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111221': {
        image: 'icon/7-7.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111321': {
        image: 'icon/7-7.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },


      '111322': {
        image: 'icon/7-8.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111222': {
        image: 'icon/7-8.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111122': {
        image: 'icon/7-8.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },


      '111323': {
        image: 'icon/7-9.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111223': {
        image: 'icon/7-9.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111123': {
        image: 'icon/7-9.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },


      '111302': {
        image: 'icon/7-10.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111202': {
        image: 'icon/7-10.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111102': {
        image: 'icon/7-10.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },

      '111303': {
        image: 'icon/7-11.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111203': {
        image: 'icon/7-11.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111103': {
        image: 'icon/7-11.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },

      '111111': {
        image: 'icon/7-12.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111211': {
        image: 'icon/7-12.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
      '111311': {
        image: 'icon/7-12.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },

      'default': {
        image: 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
        rotation: " rotation = Math.PI * f.get('LastAngle')/180;",
        color: "let colors = { '': '#00aa00', '-33300000': '#000000', '33310200': '#c500ff', '33310100': '#c500ff', '33310000': '#c500ff', '33300000': '#c500ff', '33310120': '#c500ff', '33310300': '#ff0000', '33310302': '#ff0000', '33310301': '#ff0000', '33320000': '#ff0000', '33320300': '#ff0000', '33320200': '#ff0000' }; color = colors[f.get('Age') || ''];"
      },
    }
  }
}

export let templateRules = {
  "GravityField": {
    "attributes": {
      "ID": {
        "title": "编号"
      },
      "Gravity": {
        "title": "数值"
      },
      "GravityName": {
        "title": "名称"
      },
      "ShowCode": {
        "title": "显示码"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "AviationMagnetic": {
    "attributes": {
      "ID": {
        "title": "编号"
      },
      "Magnitude": {
        "title": "数值"
      },
      "MagnitudeName": {
        "title": "名称"
      },
      "ShowCode": {
        "title": "显示码"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "CrustLithospericStructure": {
    "attributes": {
      "ID": {
        "title": "构架点编号"
      },
      "DataBodyNameCode": {
        "title": "数据体名称代码"
      },
      "Lon": {
        "title": "经度"
      },
      "Lat": {
        "title": "纬度"
      },
      "Elevation": {
        "title": "海拔高度 [米]"
      },
      "Rho": {
        "title": "密度值"
      },
      "RhoMin": {
        "title": "密度（区间）最小值"
      },
      "RhoMax": {
        "title": "密度（区间）最大值"
      },
      "Q": {
        "title": "介质品质因子"
      },
      "QMin": {
        "title": "介质品质因子（区间）最小值"
      },
      "QMax": {
        "title": "介质品质因子（区间）最大值"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "Station": {
    "attributes": {
      "ID": {
        "title": "台站编码"
      },
      "City": {
        "title": "所在城市"
      },
      "StationName": {
        "title": "台站名称"
      },
      "StationType": {
        "title": "台站类型"
      },
      "StationLongitude": {
        "title": "台站经度"
      },
      "StationLatitude": {
        "title": "台站纬度"
      },
      "Elevation": {
        "title": "台站海拔高度[米]"
      },
      "Lithlogy": {
        "title": "台基岩性"
      },
      "Instrument": {
        "title": "仪器类型"
      },
      "SensitivityNS": {
        "title": "仪器南北响应灵敏度 [count*s/μm]"
      },
      "SensitivityEW": {
        "title": "仪器东西响应灵敏度 [count*s/μm]"
      },
      "SensitivityV": {
        "title": "仪器垂直响应灵敏度 [count*s/μm]"
      },
      "TestTime": {
        "title": "测定日期"
      },
      "StartTime": {
        "title": "起始时间"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "CrustIsoline": {
    "attributes": {
      "ID": {
        "title": "编号"
      },
      "Depth": {
        "title": "数值"
      },
      "DepthName": {
        "title": "名称"
      },
      "ShowCode": {
        "title": "显示码"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "GeophySvyLine": {
    "attributes": {
      "ID": {
        "title": "测线编号"
      },
      "ProjectID": {
        "title": "测线所属探测工程编号"
      },
      "FieldID": {
        "title": "测线代码"
      },
      "Name": {
        "title": "测线名称"
      },
      "SvyLineSource": {
        "title": "测线来源与类型"
      },
      "CollectedLineSource": {
        "title": "收集地球物理测线来源补充说明来源"
      },
      "Purpose": {
        "title": "探测目的"
      },
      "SvyMethod": {
        "title": "探测方法"
      },
      "StartMilestoneNum": {
        "title": "起点桩号"
      },
      "EndMilestoneNum": {
        "title": "终点桩号"
      },
      "Length": {
        "title": "测线长度 [米]"
      },
      "ResultName": {
        "title": "综合解释剖面名称"
      },
      "ExpData_ARWID": {
        "title": "综合解释剖面原始数据文件编号（sgy等）"
      },
      "ResultMap_ARWID": {
        "title": "综合解释剖面矢量图原始文件编号"
      },
      "ResultMap_AIID": {
        "title": "综合解释剖面栅格图原始文件编号"
      },
      "FaultPtProfile_AIID": {
        "title": "断点解释剖面图图像编号"
      },
      "FaultPtProfile_ARWID": {
        "title": "断点解释剖面图原始文件编号"
      },
      "ShowCode": {
        "title": "显示码（制图用）"
      },
      "CommentInfo": {
        "title": "测线备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "GeophySvyPoint": {
    "attributes": {
      "ID": {
        "title": "测点编号"
      },
      "SvyLineID": {
        "title": "测线编号"
      },
      "FieldID": {
        "title": "野外编号"
      },
      "SvyMethod": {
        "title": "探测方法"
      },
      "SvyPointDescription": {
        "title": "测点描述"
      },
      "MilestoneNum": {
        "title": "测点桩号"
      },
      "Lon": {
        "title": "测点经度"
      },
      "Lat": {
        "title": "测点纬度"
      },
      "Elevation": {
        "title": "高程 [米]"
      },
      "LabelInfo": {
        "title": "拐点标注名称"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "GeophySvyFaultPoint": {
    "attributes": {
      "ID": {
        "title": "断点编号"
      },
      "SvyLineID": {
        "title": "所属测线编号"
      },
      "TargetFaultID": {
        "title": "目标断层编号"
      },
      "TargetFaultSource": {
        "title": "目标断层来源"
      },
      "TargetFaultName": {
        "title": "断层名称"
      },
      "MeasureLength": {
        "title": "断点距起点距离 [米]"
      },
      "Lon": {
        "title": "断点经度"
      },
      "Lat": {
        "title": "断点纬度"
      },
      "M0Depth": {
        "title": "上断点埋深 [米]"
      },
      "M0": {
        "title": "上断点断距值 [米]"
      },
      "Age0": {
        "title": "上断点界面年代"
      },
      "ViewDirection": {
        "title": "视倾向 [度]"
      },
      "ViewClination": {
        "title": "视倾角 [度]"
      },
      "FaultType": {
        "title": "断层性质"
      },
      "Reliability": {
        "title": "可靠程度"
      },
      "FaultDescription": {
        "title": "断点描述"
      },
      "ShowCode": {
        "title": "显示码"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "GNSSStation": {
    "attributes": {
      "ID": {
        "title": "台站编码"
      },
      "ProjectID": {
        "title": "工程编号"
      },
      "LocationName": {
        "title": "所在位置地名"
      },
      "StationName": {
        "title": "台站名称"
      },
      "StationInstallationType": {
        "title": "台站安装类型"
      },
      "StationLongitude": {
        "title": "台站经度"
      },
      "StationLatitude": {
        "title": "台站纬度"
      },
      "StationElevation": {
        "title": "台站海拔高度[米]"
      },
      "AntennaType": {
        "title": "天线类型"
      },
      "AHMeasureMethod": {
        "title": "天线高测量方式"
      },
      "AntennaHeith": {
        "title": "天线高[m]"
      },
      "ApproxPosZ": {
        "title": "近似坐标Z[m]"
      },
      "ApproxPosY": {
        "title": "近似坐标Y[m]"
      },
      "ApproxPosX": {
        "title": "近似坐标X[m]"
      },
      "Lithlogy": {
        "title": "台基岩性"
      },
      "EvironmentPhoto_AIID": {
        "title": "安装环境照片"
      },
      "TestTime": {
        "title": "测定日期"
      },
      "StartTime": {
        "title": "观测起始时间"
      },
      "EndTime": {
        "title": "观测结束时间"
      },
      "MeasuringTimeDetail": {
        "title": "测量时间详细说明"
      },
      "ReferenceFrame": {
        "title": "参考框架"
      },
      "ResultData_ARWID": {
        "title": "结果数据文件编号"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "HorizontalDeformation": {
    "attributes": {
      "ID": {
        "title": "编号"
      },
      "Velocity": {
        "title": "速率 [毫米/年]"
      },
      "Direction": {
        "title": "方向"
      },
      "ShowCode": {
        "title": "显示码"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "VerticalDeformation": {
    "attributes": {
      "ID": {
        "title": "编号"
      },
      "Displace": {
        "title": "数值"
      },
      "ShowCode": {
        "title": "显示码"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "RelocationISCatalog": {
    "attributes": {
      "ID": {
        "title": "编号"
      },
      "OccurrenceDate": {
        "title": "日期"
      },
      "OccurrenceHour": {
        "title": "时（24小时制）"
      },
      "OccurrenceMinute": {
        "title": "分"
      },
      "OccurrenceSecond": {
        "title": "秒（至少小数点后两位）"
      },
      "Magnitude": {
        "title": "震级 [Ml]"
      },
      "Lon": {
        "title": "经度"
      },
      "Lat": {
        "title": "纬度"
      },
      "Depth": {
        "title": "震源深度 [公里]"
      },
      "RMS": {
        "title": "定位残差 [秒]"
      },
      "LocationName": {
        "title": "地名"
      },
      "Epicenter": {
        "title": "宏观震中烈度"
      },
      "SeismicPhaseNum": {
        "title": "震相数"
      },
      "LocationErrorX": {
        "title": "东西向定位误差 [米]"
      },
      "LocationErrorY": {
        "title": "南北向定位误差 [米]"
      },
      "LocationErrorZ": {
        "title": "深度定位误差 [米]"
      },
      "NCTP": {
        "title": "所用P波到时数"
      },
      "NCTS": {
        "title": "所用S波到时数"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "ISCatalog": {
    "attributes": {
      "ID": {
        "title": "地震编号"
      },
      "OccurrenceDate": {
        "title": "日期"
      },
      "OccurrenceTime": {
        "title": "时间"
      },
      "LocationName": {
        "title": "地名"
      },
      "Lon": {
        "title": "经度"
      },
      "Lat": {
        "title": "纬度"
      },
      "MagnitudeMl": {
        "title": "震级 [Ml]"
      },
      "MagnitudeMs": {
        "title": "震级 [Ms]（大于4.7必填）"
      },
      "Depth": {
        "title": "震源深度 [公里]"
      },
      "Epicenter": {
        "title": "宏观震中烈度"
      },
      "LastAngle": {
        "title": "符号或标注旋转角度"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "StrongSeismicCatalog": {
    "attributes": {
      "ID": {
        "title": "强震事件编号"
      },
      "OccurrenceDate": {
        "title": "日期"
      },
      "OccurrenceTime": {
        "title": "发震时间"
      },
      "LocationName": {
        "title": "地名"
      },
      "Lon": {
        "title": "经度"
      },
      "Lat": {
        "title": "纬度"
      },
      "Magnitude": {
        "title": "震级 [M]"
      },
      "Depth": {
        "title": "震源深度 [公里]"
      },
      "Epicenter": {
        "title": "宏观震中烈度"
      },
      "Accuracy": {
        "title": "精度"
      },
      "ILGraph_AIID": {
        "title": "等震线图图表编号"
      },
      "ILGraph_ARWID": {
        "title": "等震线图原始图表编号"
      },
      "LastAngle": {
        "title": "符号或标注旋转角度"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "Ug3DGridPoint": {
    "attributes": {
      "ID": {
        "title": "构架点编号"
      },
      "ModelID": {
        "title": "数据模型编号"
      },
      "LayNo": {
        "title": "层面号"
      },
      "Depth": {
        "title": "层面深度"
      },
      "Vs": {
        "title": "横波波速"
      },
      "Vp": {
        "title": "纵波波速"
      },
      "Rho": {
        "title": "密度值"
      },
      "Q": {
        "title": "介质品质因子"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "Ug3DMeshLattice": {
    "attributes": {
      "ID": {
        "title": "目标区编号"
      },
      "PointID": {
        "title": "点编号"
      },
      "X": {
        "title": "网格点x坐标"
      },
      "Y": {
        "title": "网格点y坐标"
      },
      "Z": {
        "title": "网格点z坐标"
      },
      "Vs": {
        "title": "S波速度"
      },
      "Vp": {
        "title": "P波速度"
      },
      "Rho": {
        "title": "密度"
      },
      "Q": {
        "title": "介质品质因子"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "MaterialPolygonLayer_G": {
    "attributes": {
      "ID": {
        "title": "面状资料编号"
      },
      "MaterialName": {
        "title": "资料图件名称"
      },
      "CoordinateSystem": {
        "title": "坐标系统"
      },
      "Projection": {
        "title": "投影信息"
      },
      "Scale": {
        "title": "比例尺（分母）"
      },
      "Publisher": {
        "title": "出版单位"
      },
      "PublishDate": {
        "title": "出版日期"
      },
      "IsElectronicVersion": {
        "title": "是否为电子资料"
      },
      "ElectronicMaterial_ARWID": {
        "title": "电子资料原始文件编号"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "StressField": {
    "attributes": {
      "ID": {
        "title": "编号"
      },
      "Gravity": {
        "title": "数值"
      },
      "GravityName": {
        "title": "名称"
      },
      "ShowCode": {
        "title": "显示码"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "StraIsoline": {
    "attributes": {
      "ID": {
        "title": "编号"
      },
      "StraiName": {
        "title": "等厚线名称"
      },
      "StraiValue": {
        "title": "数值"
      },
      "ShowCode": {
        "title": "等厚线显示码"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "DrillHole": {
    "attributes": {
      "ID": {
        "title": "钻孔编号"
      },
      "ProjectID": {
        "title": "工程编号"
      },
      "ProfileID": {
        "title": "钻孔剖面编号"
      },
      "FieldID": {
        "title": "野外编号"
      },
      "Purpose": {
        "title": "钻探目的"
      },
      "DrillDate": {
        "title": "钻探日期"
      },
      "LocationName": {
        "title": "钻探地点"
      },
      "DrillSource": {
        "title": "钻孔来源与类型"
      },
      "Lon": {
        "title": "孔位经度"
      },
      "Lat": {
        "title": "孔位纬度"
      },
      "Elevation": {
        "title": "孔口标高 [米]"
      },
      "Depth": {
        "title": "孔深 [米]"
      },
      "CoreTotalThickness": {
        "title": "岩芯总长 [米]"
      },
      "HoloceneThickness": {
        "title": "全新统厚度 [米]"
      },
      "UpPleiThickness": {
        "title": "上更新统厚度 [米]"
      },
      "MidPleiThickness": {
        "title": "中更新统厚度 [米]"
      },
      "LowPleiThickness": {
        "title": "下更新统厚度 [米]"
      },
      "PrePleiThickness": {
        "title": "前第四纪厚度 [米]"
      },
      "CollectedSampleCount": {
        "title": "采集样品总数"
      },
      "SampleCount": {
        "title": "送样总数"
      },
      "DatingSampleCount": {
        "title": "获得结果样品总数"
      },
      "IsGeophyWell": {
        "title": "是否开展地球物理测井"
      },
      "CollectedEnviromentSampleCount": {
        "title": "采集环境与工程样品数"
      },
      "EnviromentSampleCount": {
        "title": "环境与工程样品送样总数"
      },
      "TestedEnviromentSampleCount": {
        "title": "获得测试结果的环境与工程样品数"
      },
      "ColumnChart_AIID": {
        "title": "钻孔柱状图图像文件编号"
      },
      "ColumnChart_ARWID": {
        "title": "钻孔柱状图原始档案编号"
      },
      "CorePhoto_AIID": {
        "title": "岩芯照片图像档案编号"
      },
      "CorePhoto_ARWID": {
        "title": "岩芯照片原始档案编号"
      },
      "DrillingLog_AIID": {
        "title": "钻孔班报编号"
      },
      "DrillingLog_ARWID": {
        "title": "钻孔班报原始文件编号"
      },
      "HydroRecord_AIID": {
        "title": "简易水文观测记录表"
      },
      "HydroRecord_ARWID": {
        "title": "简易水文观测记录表原始"
      },
      "GeologySmplRec_AIID": {
        "title": "采样记录表编号"
      },
      "GeologySmplRec_ARWID": {
        "title": "采样记录表原始文件编号"
      },
      "DepthCheck_AIID": {
        "title": "钻孔孔深检查编号"
      },
      "DepthCheck_ARWID": {
        "title": "钻孔孔深检查原始文件编号"
      },
      "WellClination_AIID": {
        "title": "井斜测量结果登记表文件编号"
      },
      "WellClination_ARWID": {
        "title": "井斜测量结果登记表原始文件编号"
      },
      "CoreCatalog_AIID": {
        "title": "原始岩芯编录表图像文件编号"
      },
      "CoreCatalog_ARWID": {
        "title": "原始岩芯编录表原始"
      },
      "SealDesignReport_ARID": {
        "title": "封孔设计及封孔报告书文件编号"
      },
      "SealDesignReport_ARWID": {
        "title": "封孔设计及封孔报告书原始文件编号"
      },
      "SealCheck_ARID": {
        "title": "钻孔质量验收报告文件编号"
      },
      "SealCheck_ARWID": {
        "title": "钻孔质量验收报告原始文件编号"
      },
      "CommentInfo": {
        "title": "钻孔描述"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "DrillFaultPoint": {
    "attributes": {
      "ID": {
        "title": "断点编号"
      },
      "DrillProfileID": {
        "title": "跨断层钻探剖面编号"
      },
      "FieldID": {
        "title": "野外编号"
      },
      "SvyMethod": {
        "title": "探测手段"
      },
      "TopDepth": {
        "title": "上断点埋深 [米]"
      },
      "TopAge": {
        "title": "上覆地层年代 [ka]"
      },
      "LastAge": {
        "title": "断错最新地层年代 [ka]"
      },
      "LastInterfaceDisplace": {
        "title": "错断断距"
      },
      "ViewDirection": {
        "title": "视倾向 [度]"
      },
      "ViewClination": {
        "title": "视倾角 [度]"
      },
      "FaultType": {
        "title": "断层性质"
      },
      "FaultPointDescription": {
        "title": "断点描述"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "DrillProfile": {
    "attributes": {
      "ID": {
        "title": "剖面编号"
      },
      "ProjectID": {
        "title": "工程编号"
      },
      "TargetFaultID": {
        "title": "目标断层编号"
      },
      "TargetFaultSource": {
        "title": "目标断层来源"
      },
      "TargetFaultName": {
        "title": "目标断层名称"
      },
      "Name": {
        "title": "剖面名称"
      },
      "LocationName": {
        "title": "钻探地点"
      },
      "DrillingHoleCount": {
        "title": "钻孔数"
      },
      "Length": {
        "title": "剖面长度 [米]"
      },
      "FaultPointCount": {
        "title": "断点数"
      },
      "HoleSection_AIID": {
        "title": "钻孔剖面图图像文件编号"
      },
      "HoleSection_ARWID": {
        "title": "钻孔剖面图原始文件"
      },
      "CommentInfo": {
        "title": "跨断层钻探描述"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "CollectedDrillHole": {
    "attributes": {
      "ID": {
        "title": "钻孔编号"
      },
      "DrillDate": {
        "title": "钻探日期"
      },
      "LocationName": {
        "title": "钻探地点"
      },
      "Lon": {
        "title": "孔位经度"
      },
      "Lat": {
        "title": "孔位纬度"
      },
      "Elevation": {
        "title": "孔口标高 [米]"
      },
      "Depth": {
        "title": "孔深"
      },
      "CoreTotalThickness": {
        "title": "岩芯总长 [米]"
      },
      "HoloceneThickness": {
        "title": "全新统厚度 [米]"
      },
      "UpPleiThickness": {
        "title": "上更新统厚度 [米]"
      },
      "MidPleiThickness": {
        "title": "中更新统厚度 [米]"
      },
      "LowPleiThickness": {
        "title": "下更新统厚度 [米]"
      },
      "PrePleiThickness": {
        "title": "前第四纪厚度 [米]"
      },
      "IsGeophyWell": {
        "title": "是否开展地球物理测井"
      },
      "ColumnChart_AIID": {
        "title": "钻孔柱状图图像文件编号"
      },
      "ColumnChart_ARWID": {
        "title": "钻孔柱状图原始档案编号"
      },
      "CommentInfo": {
        "title": "钻孔描述"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "MaterialPolygonLayer_D": {
    "attributes": {
      "ID": {
        "title": "面状资料编号"
      },
      "MaterialName": {
        "title": "资料图件名称"
      },
      "CoordinateSystem": {
        "title": "坐标系统"
      },
      "Projection": {
        "title": "投影信息"
      },
      "Scale": {
        "title": "比例尺（分母）"
      },
      "Publisher": {
        "title": "出版单位"
      },
      "PublishDate": {
        "title": "出版日期"
      },
      "IsElectronicVersion": {
        "title": "是否为电子资料"
      },
      "ElectronicMaterial_ARWID": {
        "title": "电子资料原始文件编号"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "SeismicZone": {
    "attributes": {
      "ID": {
        "title": "编号"
      },
      "ZoningName": {
        "title": "分区名称"
      },
      "Grade": {
        "title": "分类等级"
      },
      "MaxMagnitude": {
        "title": "历史最大震级"
      },
      "ShowCode": {
        "title": "显示码"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "SeismicBelt": {
    "attributes": {
      "ID": {
        "title": "编号"
      },
      "BeltName": {
        "title": "地震带名称"
      },
      "V4": {
        "title": "4级以上地震年发生率"
      },
      "B": {
        "title": "b值"
      },
      "AverageDepth": {
        "title": "平均震源深度 [公里]"
      },
      "MaxMu": {
        "title": "震级上限"
      },
      "ShowCode": {
        "title": "显示码"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "PotentialSourceRegion": {
    "attributes": {
      "ID": {
        "title": "潜在震源区编号"
      },
      "Name": {
        "title": "潜源名称"
      },
      "Mu": {
        "title": "震级上限 [M]"
      },
      "Direction1": {
        "title": "第一破裂方向"
      },
      "P1": {
        "title": "第一破裂方向概率"
      },
      "Direction2": {
        "title": "第二破裂方向"
      },
      "P2": {
        "title": "第二破裂方向概率"
      },
      "F1": {
        "title": "4.0 – 5.4级概率"
      },
      "F2": {
        "title": "5.5 – 5.9级概率"
      },
      "F3": {
        "title": "6.0 – 6.4级概率"
      },
      "F4": {
        "title": "6.5 – 6.9级概率"
      },
      "F5": {
        "title": "7.0 – 7.4级概率"
      },
      "F6": {
        "title": "7.5级以上概率"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "IntensityRegion": {
    "attributes": {
      "ID": {
        "title": "编号"
      },
      "Name": {
        "title": "名称"
      },
      "Grade": {
        "title": "分类等级"
      },
      "OccurrenceDate": {
        "title": "日期"
      },
      "OccurrenceTime": {
        "title": "时间"
      },
      "Magnitude": {
        "title": "震级"
      },
      "ShowCode": {
        "title": "显示码"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "Source": {
        "title": "数据来源"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "IsoseismalLine": {
    "attributes": {
      "ID": {
        "title": "编号"
      },
      "Name": {
        "title": "名称"
      },
      "Grade": {
        "title": "分类等级"
      },
      "OccurrenceDate": {
        "title": "日期"
      },
      "OccurrenceTime": {
        "title": "时间"
      },
      "Magnitude": {
        "title": "震级"
      },
      "ShowCode": {
        "title": "显示码"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "Source": {
        "title": "数据来源"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "Fault": {
    "attributes": {
      "ID": {
        "title": "编号"
      },
      "FractureZoneName": {
        "title": "断裂带名称"
      },
      "Name": {
        "title": "断层名称"
      },
      "Feature": {
        "title": "断层性质"
      },
      "Strike": {
        "title": "走向 [16方位]"
      },
      "DipDir": {
        "title": "倾向"
      },
      "DipAngle": {
        "title": "倾角"
      },
      "FaultLength": {
        "title": "长度 [公里]"
      },
      "TopDepth": {
        "title": "上断点埋深 [米]"
      },
      "Width": {
        "title": "破碎带宽度 [米]"
      },
      "Age": {
        "title": "断层活动时代"
      },
      "Photo_AIID": {
        "title": "照片文件编号"
      },
      "Photo_ARWID": {
        "title": "照片原始文件编号"
      },
      "PhotoViewingTo": {
        "title": "照片镜向"
      },
      "Photographer": {
        "title": "拍摄者"
      },
      "nsb1": {
        "title": "断裂符号基础位"
      },
      "nsb2": {
        "title": "断裂符号下标位"
      },
      "nsb3": {
        "title": "断层符号上标位"
      },
      "ShowCode": {
        "title": "显示码"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "FaultAttitude": {
    "attributes": {
      "ID": {
        "title": "产状点编号"
      },
      "FaultID": {
        "title": "断层编号"
      },
      "Feature": {
        "title": "断层性质"
      },
      "FaultDip": {
        "title": "断层倾向 [度]"
      },
      "FaultDipAngle": {
        "title": "断层倾角 [度]"
      },
      "LastAngle": {
        "title": "符号或标注旋转角度"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "Fold": {
    "attributes": {
      "ID": {
        "title": "编号"
      },
      "FoldName": {
        "title": "褶皱名称"
      },
      "FoldType": {
        "title": "褶皱类型"
      },
      "Length": {
        "title": "长度 [公里]"
      },
      "Width": {
        "title": "宽度 [公里]"
      },
      "FronWingWidth": {
        "title": "前翼宽度（主断层旁） [米]"
      },
      "BackWingWidth": {
        "title": "后翼宽度 [米]"
      },
      "IsReversed": {
        "title": "前翼是否倒转"
      },
      "IsExposed": {
        "title": "主断层是否出露"
      },
      "AllStratigraphy": {
        "title": "参与褶皱的所有地层"
      },
      "NewestStratigraphy": {
        "title": "参与褶皱的最新地层"
      },
      "AxisDirection": {
        "title": "褶皱轴向"
      },
      "MaxShotenRate": {
        "title": "平均缩短速率 [毫米/年]"
      },
      "AveShotenRate": {
        "title": "平均缩短速率 [毫米/年]"
      },
      "MaxUpliftRate": {
        "title": "最大隆升速率 [毫米/年]"
      },
      "AveUplistRate": {
        "title": "平均隆升速率 [毫米/年]"
      },
      "FoldDescription": {
        "title": "褶皱描述"
      },
      "Photo_AIID": {
        "title": "照片文件编号"
      },
      "Photo_ARWID": {
        "title": "照片原始文件编号"
      },
      "PhotoViewingTo": {
        "title": "照片镜向"
      },
      "Photographer": {
        "title": "拍摄者"
      },
      "nsb1": {
        "title": "褶皱符号基础位"
      },
      "nsb2": {
        "title": "褶皱符号下标位"
      },
      "nsb3": {
        "title": "褶皱符号上标位"
      },
      "ShowCode": {
        "title": "显示码"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "FractureBelt": {
    "attributes": {
      "ID": {
        "title": "编号"
      },
      "TargetRegionID": {
        "title": "目标区编号"
      },
      "ForbiddenBeltName": {
        "title": "避让带名称"
      },
      "CommentInfo": {
        "title": "避让带描述"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "EpiMechanismResult": {
    "attributes": {
      "ID": {
        "title": "编号"
      },
      "OccurrenceDate": {
        "title": "发震日期"
      },
      "OccurrenceTime": {
        "title": "发震时间"
      },
      "LocationName": {
        "title": "地名"
      },
      "Lon": {
        "title": "震中经度"
      },
      "Lat": {
        "title": "震中纬度"
      },
      "Magnitude": {
        "title": "震级"
      },
      "Unit": {
        "title": "震级单位 [Ms、Ml、Mw等]"
      },
      "Depth": {
        "title": "震源深度 [公里]"
      },
      "SHAzimuth": {
        "title": "水平最大主应力方位"
      },
      "StressRegime": {
        "title": "应力状态"
      },
      "Plane1Strike": {
        "title": "Ⅰ节面走向"
      },
      "Plane1Dip": {
        "title": "Ⅰ节面倾角"
      },
      "Plane1Slip": {
        "title": "Ⅰ节面滑动角"
      },
      "Plane2Strike": {
        "title": "Ⅱ节面走向"
      },
      "Plane2Dip": {
        "title": "Ⅱ节面倾角"
      },
      "Plane2Slip": {
        "title": "Ⅱ节面滑动角"
      },
      "PAzimuth": {
        "title": "P轴方位"
      },
      "PPlunge": {
        "title": "P轴倾角"
      },
      "TAzimuth": {
        "title": "T轴方位"
      },
      "TPlunge": {
        "title": "T轴倾角"
      },
      "BAzimuth": {
        "title": "B轴方位"
      },
      "BPlunge": {
        "title": "B轴倾角"
      },
      "Method": {
        "title": "震源机制解的求解方法"
      },
      "Reference": {
        "title": "资料来源"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "GeomorphySvyPoint": {
    "attributes": {
      "ID": {
        "title": "测点编号"
      },
      "SvyLineID": {
        "title": "所属微地貌线编号"
      },
      "RegionID": {
        "title": "所属微地貌面编号"
      },
      "GeomorphySvyPrjID": {
        "title": "微地貌测量工程编号"
      },
      "FieldID": {
        "title": "野外编号"
      },
      "Lon": {
        "title": "经度"
      },
      "Lat": {
        "title": "纬度"
      },
      "Elevation": {
        "title": "高程 [米]"
      },
      "CommentInfo": {
        "title": "备注-观测点说明"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "GeomorphySvyLine": {
    "attributes": {
      "ID": {
        "title": "测线编号"
      },
      "GeomorphySvyPrjID": {
        "title": "微地貌测量工程编号"
      },
      "FieldID": {
        "title": "野外编号"
      },
      "Name": {
        "title": "测线名称"
      },
      "Profile_AIID": {
        "title": "剖面线分析结果图图像文件编号"
      },
      "Profile_ARWID": {
        "title": "剖面线分析结果图原始文件编号"
      },
      "Photo_AIID": {
        "title": "典型照片文件编号"
      },
      "Photo_ARWID": {
        "title": "典型照片原始文件编号"
      },
      "PhotoViewingTo": {
        "title": "照片镜向"
      },
      "Photographer": {
        "title": "拍摄者"
      },
      "CommentInfo": {
        "title": "备注-测量线描述及目的"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "GeomorphySvyRegion": {
    "attributes": {
      "ID": {
        "title": "测量区域编号"
      },
      "GeomorphySvyPrjID": {
        "title": "微地貌测量工程编号"
      },
      "FieldID": {
        "title": "野外编号"
      },
      "Name": {
        "title": "测量区域名称"
      },
      "Profile_AIID": {
        "title": "地貌面分析结果图图像文件编号"
      },
      "Profile_ARWID": {
        "title": "地貌面结果图文件原始文件编号"
      },
      "Photo_AIID": {
        "title": "典型照片文件编号"
      },
      "Photo_ARWID": {
        "title": "典型照片原始文件编号"
      },
      "PhotoViewingTo": {
        "title": "PhotoViewingTo"
      },
      "Photographer": {
        "title": "拍摄者"
      },
      "CommentInfo": {
        "title": "备注-测量面描述及目的"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "GeomorStation": {
    "attributes": {
      "ID": {
        "title": "测点编号"
      },
      "GeomorphySvyPrjID": {
        "title": "微地貌测量工程编号"
      },
      "Lon": {
        "title": "经度"
      },
      "Lat": {
        "title": "纬度"
      },
      "Elevation": {
        "title": "高程 [米]"
      },
      "CommentInfo": {
        "title": "备注-观测点说明"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "MaterialPolygonLayer_S": {
    "attributes": {
      "ID": {
        "title": "面状资料编号"
      },
      "MaterialName": {
        "title": "资料图件名称"
      },
      "CoordinateSystem": {
        "title": "坐标系统"
      },
      "Projection": {
        "title": "投影信息"
      },
      "Scale": {
        "title": "比例尺（分母）"
      },
      "Publisher": {
        "title": "出版单位"
      },
      "PublishDate": {
        "title": "出版日期"
      },
      "IsElectronicVersion": {
        "title": "是否为电子资料"
      },
      "ElectronicMaterial_ARWID": {
        "title": "电子资料原始文件编号"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "MaterialPolygonLayer_B": {
    "attributes": {
      "ID": {
        "title": "面状资料编号1"
      },
      "MaterialName": {
        "title": "资料图件名称"
      },
      "CoordinateSystem": {
        "title": "坐标系统"
      },
      "Projection": {
        "title": "投影信息"
      },
      "Scale": {
        "title": "比例尺（分母）"
      },
      "Publisher": {
        "title": "出版单位"
      },
      "PublishDate": {
        "title": "出版日期"
      },
      "IsElectronicVersion": {
        "title": "是否为电子资料"
      },
      "ElectronicMaterial_ARWID": {
        "title": "电子资料原始文件编号"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "Stratigraphy": {
    "attributes": {
      "ID": {
        "title": "地层编号"
      },
      "StratigraphyName": {
        "title": "地层名称"
      },
      "Symbol": {
        "title": "地层年代"
      },
      "SedimentaryFacies": {
        "title": "沉积相（符号）"
      },
      "Thickness": {
        "title": "地层厚度 [米]"
      },
      "Description": {
        "title": "地层描述"
      },
      "UnionName": {
        "title": "合并地层名称"
      },
      "symbolMain": {
        "title": "地层符号基础位"
      },
      "symbolUp": {
        "title": "符号上标"
      },
      "symbolLow": {
        "title": "符号下标"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "StratigraphyLine": {
    "attributes": {
      "ID": {
        "title": "线编号"
      },
      "GeologyBoundaryLine": {
        "title": "地质界线类型"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "StraAttitude": {
    "attributes": {
      "ID": {
        "title": "地层点编号"
      },
      "GeologicalSvyPointID": {
        "title": "地质调查观测点编号"
      },
      "FieldID": {
        "title": "野外编号"
      },
      "StratigraphyName": {
        "title": "地层名称"
      },
      "Strike": {
        "title": "走向 [°]"
      },
      "Dip": {
        "title": "实测倾向 [度]"
      },
      "DipAngle": {
        "title": "倾角 [度]"
      },
      "ContactRelation": {
        "title": "接触关系"
      },
      "ContactReDescription": {
        "title": "接触关系描述"
      },
      "Thickness": {
        "title": "地层厚度 [米]"
      },
      "StratigraphyDescription": {
        "title": "地层描述"
      },
      "DataSource": {
        "title": "数据来源"
      },
      "IsReversed": {
        "title": "是否倒转地层产状"
      },
      "Photo_AIID": {
        "title": "典型照片文件编号"
      },
      "Photo_ARWID": {
        "title": "典型照片原始文件编号"
      },
      "ViewTo": {
        "title": "照片镜向"
      },
      "Photographer": {
        "title": "拍摄者"
      },
      "TypicalProfile_AIID": {
        "title": "典型剖面图图像文件编号"
      },
      "TypicalProfile_ARWID": {
        "title": "典型剖面图原始文件编号"
      },
      "Sketch_AIID": {
        "title": "平面图文件编号"
      },
      "Sketch_ARWID": {
        "title": "平面图原始文件编号"
      },
      "Ismodifyworkmap": {
        "title": "是否修改工作底图"
      },
      "IsInmap": {
        "title": "是否在图中显示"
      },
      "LastAngle": {
        "title": "符号或标注旋转角度"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "StraAttitudeType": {
        "title": "地层产状类型"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "Rock": {
    "attributes": {
      "ID": {
        "title": "岩体编号"
      },
      "RockName": {
        "title": "岩体名称"
      },
      "Symbol": {
        "title": "岩体类别"
      },
      "QDHO": {
        "title": "侵入时代"
      },
      "Description": {
        "title": "岩体描述"
      },
      "RockUnion": {
        "title": "岩体合并"
      },
      "nsb1": {
        "title": "岩体符号基础位"
      },
      "nsb2": {
        "title": "岩体符号下标位"
      },
      "nsb3": {
        "title": "岩体符号上标位"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "GeomorphySvyRegion_B": {
    "attributes": {
      "ID": {
        "title": "测量区域编号"
      },
      "GeomorphySvyPrjID": {
        "title": "微地貌测量工程编号"
      },
      "FieldID": {
        "title": "野外编号"
      },
      "Name": {
        "title": "测量区域名称"
      },
      "Profile_AIID": {
        "title": "地貌面分析结果图图像文件编号"
      },
      "Profile_ARWID": {
        "title": "地貌面结果图文件原始文件编号"
      },
      "Photo_AIID": {
        "title": "典型照片文件编号"
      },
      "Photo_ARWID": {
        "title": "典型照片原始文件编号"
      },
      "PhotoViewingTo": {
        "title": "PhotoViewingTo"
      },
      "Photographer": {
        "title": "拍摄者"
      },
      "CommentInfo": {
        "title": "备注-测量面描述及目的"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "ImageIndexLayer": {
    "attributes": {
      "ID": {
        "title": "编号"
      },
      "Sensor": {
        "title": "传感器"
      },
      "ImageDate": {
        "title": "时相"
      },
      "ImageName": {
        "title": "影像名称"
      },
      "City": {
        "title": "城市名称"
      },
      "Format": {
        "title": "数据格式"
      },
      "Projection": {
        "title": "投影信息"
      },
      "DataSource": {
        "title": "数据源"
      },
      "BandInfo": {
        "title": "波段信息"
      },
      "ProcessInfo": {
        "title": "处理过程"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "RSInterpretationLine": {
    "attributes": {
      "ID": {
        "title": "解译线编号"
      },
      "GeomorphyCode": {
        "title": "地貌代码"
      },
      "GeomorphyType": {
        "title": "地貌类型"
      },
      "GeomorphyName": {
        "title": "地貌名称"
      },
      "InterpretationAccording": {
        "title": "解释依据"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "RSInterpretationPolygon": {
    "attributes": {
      "ID": {
        "title": "解译面编号"
      },
      "GeomorphyCode": {
        "title": "地貌代码"
      },
      "GeomorphyType": {
        "title": "地貌类型"
      },
      "GeomorphyName": {
        "title": "地貌名称"
      },
      "GeomorphyAccording": {
        "title": "解译依据"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "Geomorphy": {
    "attributes": {
      "ID": {
        "title": "编号"
      },
      "GeomorphyCode": {
        "title": "地貌代码"
      },
      "GeomorphyName": {
        "title": "地貌名称"
      },
      "GeomorphyType": {
        "title": "地貌类型"
      },
      "GeomorphyDescription": {
        "title": "地貌描述"
      },
      "Length": {
        "title": "地表破裂（断塞塘等）长 [米]"
      },
      "width": {
        "title": "地表破裂（断塞塘等）宽 [米]"
      },
      "Height": {
        "title": "地表破裂（断塞塘等）高/深 [米]"
      },
      "MaxVerticalDisplacement": {
        "title": "最大垂直位移 [米]"
      },
      "MaxHorizenOffset": {
        "title": "最大水平位移 [米]"
      },
      "Feature": {
        "title": "性质"
      },
      "CreateDate": {
        "title": "形成时代"
      },
      "IsSurfaceRuptureBelt": {
        "title": "是否为已知地震的地表破裂"
      },
      "FractureType": {
        "title": "地震地表破裂类型"
      },
      "Photo_AIID": {
        "title": "照片文件编号"
      },
      "Photo_ARWID": {
        "title": "照片原始文件编号"
      },
      "PhotoViewingTo": {
        "title": "照片镜向"
      },
      "Photographer": {
        "title": "拍摄者"
      },
      "nsb1": {
        "title": "地貌符号基础位"
      },
      "nsb2": {
        "title": "地貌符号下标位"
      },
      "nsb3": {
        "title": "地貌符号上标位"
      },
      "CommentInfo": {
        "title": "描述"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "GeomorphyLine": {
    "attributes": {
      "ID": {
        "title": "地貌线编号"
      },
      "GeomorphyCode": {
        "title": "地貌代码"
      },
      "GeomorphyName": {
        "title": "地貌名称"
      },
      "GeomorphyType": {
        "title": "地貌类型"
      },
      "GeomorphyDescription": {
        "title": "地貌描述"
      },
      "Length": {
        "title": "地表破裂（断塞塘等）长 [米]"
      },
      "Width": {
        "title": "地表破裂（断塞塘等）宽 [米]"
      },
      "Height": {
        "title": "地表破裂（断塞塘等）高/深 [米]"
      },
      "MaxVerticalDisplacement": {
        "title": "最大垂直位移 [米]"
      },
      "MaxHorizenOffset": {
        "title": "最大水平位移 [米]"
      },
      "MaxTDisplacement": {
        "title": "最大水平//张缩位移 [米]"
      },
      "Feature": {
        "title": "性质"
      },
      "CreateDate": {
        "title": "形成时代"
      },
      "IsSurfaceRuptureBelt": {
        "title": "是否为已知地震的地表破裂"
      },
      "FractureType": {
        "title": "地震地表破裂类型"
      },
      "Photo_AIID": {
        "title": "照片文件编号"
      },
      "Photo_ARWID": {
        "title": "照片原始文件编号"
      },
      "PhotoViewingTo": {
        "title": "照片镜向"
      },
      "Photographer": {
        "title": "拍摄者"
      },
      "nsb1": {
        "title": "地貌符号基础位"
      },
      "nsb2": {
        "title": "地貌符号下标位"
      },
      "nsb3": {
        "title": "地貌符号上标位"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "GeomorphyPoint": {
    "attributes": {
      "ID": {
        "title": "地貌点编号"
      },
      "GeologicalSvyPointID": {
        "title": "地质调查观测点编号"
      },
      "GeomorphyCode": {
        "title": "地貌代码"
      },
      "GeomorphyName": {
        "title": "地貌点名称"
      },
      "GeomorphyType": {
        "title": "地貌点类型"
      },
      "Length": {
        "title": "地表破裂（断塞塘等）长 [米]"
      },
      "width": {
        "title": "地表破裂（断塞塘等）宽 [米]"
      },
      "Height": {
        "title": "地表破裂（断塞塘等）高/深 [米]"
      },
      "VerticalDisplacement": {
        "title": "垂直位移 [米]"
      },
      "HorizenOffset": {
        "title": "走向水平位移 [米]"
      },
      "TensionDisplacement": {
        "title": "水平//张缩位移 [米]"
      },
      "Feature": {
        "title": "性质"
      },
      "GeomorphyLnDirection": {
        "title": "地貌线走向（制图用）"
      },
      "CreateDate": {
        "title": "形成时代"
      },
      "IsSurfaceRuptureBelt": {
        "title": "是否为已知地震的地表破裂"
      },
      "FractureType": {
        "title": "地震地表破裂类型"
      },
      "Photo_AIID": {
        "title": "典型照片文件编号"
      },
      "Photo_ARWID": {
        "title": "典型照片原始文件编号"
      },
      "PhotoViewingTo": {
        "title": "照片镜向"
      },
      "Photographer": {
        "title": "拍摄者"
      },
      "TypicalProfile_AIID": {
        "title": "典型剖面图图表文件编号"
      },
      "TypicalProfile_ARWID": {
        "title": "典型剖面图原始文件编号"
      },
      "Sketch_AIID": {
        "title": "平面图文件编号"
      },
      "Sketch_ARWID": {
        "title": "平面图原始文件编号"
      },
      "Ismodifyworkmap": {
        "title": "是否修改工作底图"
      },
      "IsInMap": {
        "title": "是否在图中显示"
      },
      "LastAngle": {
        "title": "符号或标注旋转角度"
      },
      "CommentInfo": {
        "title": "描述"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "Basin": {
    "attributes": {
      "ID": {
        "title": "盆地编号"
      },
      "BasinName": {
        "title": "盆地名称"
      },
      "CreateDate": {
        "title": "形成时代"
      },
      "MaxDepth": {
        "title": "最大沉积厚度 [米]"
      },
      "Feature": {
        "title": "性质"
      },
      "Photo_AIID": {
        "title": "照片文件编号"
      },
      "Photo_ARWID": {
        "title": "照片原始文件编号"
      },
      "PhotoViewingTo": {
        "title": "照片镜向"
      },
      "Photographer": {
        "title": "拍摄者"
      },
      "ShowCode": {
        "title": "显示码"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "StraIsoline_B": {
    "attributes": {
      "ID": {
        "title": "编号"
      },
      "StraiName": {
        "title": "等厚线名称"
      },
      "StraiValue": {
        "title": "数值"
      },
      "ShowCode": {
        "title": "等厚线显示码"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  },
  "RockLine": {
    "attributes": {
      "ID": {
        "title": "编号"
      },
      "CommentInfo": {
        "title": "备注"
      },
      "images": {
        "title": "图件",
        "type": "image",
        "visible": "feature.get('images')"
      }
    }
  }
}
