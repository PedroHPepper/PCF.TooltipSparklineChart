import { ChartArea, ChartGroup, ChartVoronoiContainer } from "@patternfly/react-charts";
import * as React from "react";
import { useCallback } from "react";


export interface IProps {
    values?: string;
	dateValues?: string;
    color?:string;
    width?: number,
    height?:number,
    max?:number
}

const SparklineChart = (props : IProps): JSX.Element => {
    const numbers = useCallback(():any[] => {
        var datas = props.dateValues?.split(",").map(String) || []; 
        var values = props.values?.split(",").map(Number) || []; 
        var result = [];
        for(var i = 0; i < values.length; i++){
            
            result.push({ 
                name: new Date(datas[i]).toLocaleDateString("pt-br"),
                x: i,
                y: values[i]
            });
        }
        return result;
    }, [props.values, props.dateValues]);
    return(
        <div className="ws-react-charts-sparkline-overflow">
            <div>
                <ChartGroup
                    ariaDesc="Progress chart"
                    ariaTitle="Progress chart"
                    containerComponent={<ChartVoronoiContainer labels={({ datum }) => `${datum.name}\n${datum.y}`} />}
                    height={props.height}
                    width={props.width}
                    maxDomain={{y: props.max}}
                    name="Progress"
                    padding={{
                        top: 0,
                        bottom: 0,
                        left: 50,
                        right: 50,
                    }}
                    themeColor={props.color}>
                        <ChartArea
                            data={numbers()}
                        />
                </ChartGroup>
            </div>
        </div>
    );
}
export default SparklineChart;
