import * as satellite from 'satellite.js';
import agent from '../../../app/api/agent';
import { SatelliteOrbitalElement } from '../../../app/models/SatelliteOrbitalElement';




export default async function satpostester() {

    
    const object = await agent.SatelliteOrbitalElements.gettlestring("25544");

    const line1 = object.line1;
    const line2 = object.line2;




    // TLEを使い、satrecオブジェクトを初期化
    //const line1 = '1 25544U 98067A   21260.38326868  .00002108  00000-0  47329-4 0  9995';
    //const line2 = '2 25544  51.6436 246.8533 0003182  25.6729 121.4393 15.48402825302886';
    const satrec = satellite.twoline2satrec(line1, line2);
    console.log(satrec);

    
    // 現在時刻の衛星の位置を計算
    const now = new Date();
    const { position: positionEci } = satellite.propagate(satrec, now);
    
    // 衛星位置の座標系を変換(ECI -> geodetic location)
    const gstime = satellite.gstime(now); // GMST(グリニッジ恒星時)に変換

    //@ts-ignore
    const positionGd = satellite.eciToGeodetic(positionEci, gstime);
    
    // 計算結果
    console.log(positionGd.longitude); // 経度[rad]
    console.log(positionGd.latitude); // 緯度[rad]
    console.log(positionGd.height); // 高度[km]


    
   
}


//1 25544U 98067A   21260.38326868  .00002108  00000-0  47329-4 0  9995
//2 25544  51.6436 246.8533 0003182  25.6729 121.4393 15.48402825302886

function generateTLE(sat: SatelliteOrbitalElement): void {

    const EPOCHSRC = new Date(sat.EPOCH);

    const L1LineNo = `1 `; // 01-02
    const L1SatNo = sat.NORAD_CAT_ID.toString().padStart(5, "0"); //03-07
    const L1Class = `U `; //08-09

    const xxxxx = `NNNNNAAA `;//10-18

    const L1EpochYr2 = EPOCHSRC.getFullYear().toString().slice(-2);//19-20

    //@ts-ignore
    const EPOCHSRCDAYS2 = ((EPOCHSRC - new Date(EPOCHSRC.getFullYear(), 0, 0))/(1000 * 60 * 60 * 24)).toString().slice(0,12).padEnd(12,"0");//21-32

    const LINE1_NEW = L1LineNo + L1SatNo + L1Class + xxxxx + L1EpochYr2 + EPOCHSRCDAYS2;
    console.log(LINE1_NEW);




    // 先頭の行の文字列を生成する
    //const line1 = `1 ${sat.NORAD_CAT_ID.toString().padStart(5, "0")}U ${sat.OBJECT_ID.padEnd(8)}  ${sat.ELEMENT_SET_NO.toString().padStart(4)}${sat.EPOCH.toISOString().slice(2, 7).replace('-', '')}.${sat.EPOCH.getUTCHours().toString().padStart(2, '0')}${sat.EPOCH.getUTCMinutes().toString().padStart(2, '0')}${sat.EPOCH.getUTCSeconds().toString().padStart(2, '0')} ${sat.MEAN_MOTION_DOT.toFixed(8).replace('-', '0').padStart(10)} ${sat.MEAN_MOTION_DDOT.toFixed(8).replace('-', '0').padStart(8)} ${sat.BSTAR.toFixed(8).replace('-', '0').padStart(8)} 0`;
    
    const EPOCHSRCYR2 = EPOCHSRC.getFullYear().toString().slice(-2);

    //@ts-ignore
    const EPOCHSRCDAYS = (EPOCHSRC - new Date(EPOCHSRC.getFullYear(), 0, 0))/(1000 * 60 * 60 * 24);
    console.log("diff : " + EPOCHSRCDAYS.toString());

//    console.log(sat);
    const line1 = `1 ${sat.NORAD_CAT_ID.toString().padStart(5, "0")}U ${sat.OBJECT_ID.padEnd(8)}  ${sat.ELEMENT_SET_NO.toString().padStart(4)}${sat.EPOCH.toISOString().slice(2, 7).replace('-', '')}.${sat.EPOCH.getUTCHours().toString().padStart(2, '0')}${sat.EPOCH.getUTCMinutes().toString().padStart(2, '0')}${sat.EPOCH.getUTCSeconds().toString().padStart(2, '0')} ${sat.MEAN_MOTION_DOT.toFixed(8).replace('-', '0').padStart(10)} ${sat.MEAN_MOTION_DDOT.toFixed(8).replace('-', '0').padStart(8)} ${sat.BSTAR.toFixed(8).replace('-', '0').padStart(8)} 0`;
//    const line1 = `1 ${sat.NORAD_CAT_ID.toString().padStart(5, "0")}U ${sat.OBJECT_ID.padEnd(8)}  ${sat.ELEMENT_SET_NO.toString().padStart(4)}${sat.EPOCH.toISOString().slice(2, 7).replace('-', '')}.${sat.EPOCH.getUTCHours().toString().padStart(2, '0')}${sat.EPOCH.getUTCMinutes().toString().padStart(2, '0')}${sat.EPOCH.getUTCSeconds().toString().padStart(2, '0')} ${sat.MEAN_MOTION_DOT.toFixed(8).replace('-', '0').padStart(10)} ${sat.MEAN_MOTION_DDOT.toFixed(8).replace('-', '0').padStart(8)} ${sat.BSTAR.toFixed(8).replace('-', '0').padStart(8)} 0`;

    // 2行目の文字列を生成する
    //const line2 = `2 ${sat.NORAD_CAT_ID.toString().padStart(5, "0")} ${sat.INCLINATION.toFixed(4).padStart(8)} ${sat.RA_OF_ASC_NODE.toFixed(4).padStart(8)} ${sat.ECCENTRICITY.toFixed(7).toString().slice(2).padStart(8)} ${sat.ARG_OF_PERICENTER.toFixed(4).padStart(8)} ${sat.MEAN_ANOMALY.toFixed(4).padStart(8)} ${sat.MEAN_MOTION.toFixed(11).replace('-', '0').padStart(11)}${sat.REV_AT_EPOCH.toString().padStart(5)}`;
  
    console.log(line1);
    //console.log(line2);
    return ;
  }