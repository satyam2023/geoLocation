import { MutableRefObject } from "react";

export interface ILocationRegion{
    latitude:number;
    longitude:number;
}

export interface IDistanceDetail{
    [key:string]:MutableRefObject<string>,
    source:MutableRefObject<string>,
    destination:MutableRefObject<string>,
}