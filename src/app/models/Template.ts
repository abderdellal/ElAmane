import { KeyColumnPair } from "./KeyColumnPair";

export class Template
{
    id : number;
    name : string;
    SearchColumn : number;
    firstLineIsHeader : boolean;
    keyColumnPairs : KeyColumnPair[]
}