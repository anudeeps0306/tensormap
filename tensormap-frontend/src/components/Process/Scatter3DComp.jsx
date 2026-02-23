import PropTypes from "prop-types";
import Plot from "react-plotly.js";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function Scatter3DComp({ fileData, fields }) {
    const [xFeat, setXFeat] = useState(fields[0] || "");
    const [yFeat, setYFeat] = useState(fields[1] || "");
    const [zFeat, setZFeat] = useState(fields[2] || "");

    const [plotData, setPlotData] = useState({ x: [], y: [], z: [] });

    useEffect(() => {
        if (fileData && xFeat && yFeat && zFeat) {
            const x = fileData.map((row) => row[xFeat]);
            const y = fileData.map((row) => row[yFeat]);
            const z = fileData.map((row) => row[zFeat]);
            setPlotData({ x, y, z });
        }
    }, [fileData, xFeat, yFeat, zFeat]);

    if (!fields || fields.length < 3) return null;

    return (
        <Card className="mt-4">
            <CardContent className="p-4">
                <h3 className="mb-4 text-center text-base font-semibold">3D Feature Distribution</h3>

                <div className="mb-4 flex gap-4 justify-center">
                    <Select value={xFeat} onValueChange={setXFeat}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="X-Axis" />
                        </SelectTrigger>
                        <SelectContent>
                            {fields.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Select value={yFeat} onValueChange={setYFeat}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Y-Axis" />
                        </SelectTrigger>
                        <SelectContent>
                            {fields.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Select value={zFeat} onValueChange={setZFeat}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Z-Axis" />
                        </SelectTrigger>
                        <SelectContent>
                            {fields.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex justify-center">
                    {plotData.x.length > 0 && (
                        <Plot
                            data={[
                                {
                                    x: plotData.x,
                                    y: plotData.y,
                                    z: plotData.z,
                                    type: "scatter3d",
                                    mode: "markers",
                                    marker: { size: 3, opacity: 0.8 },
                                },
                            ]}
                            layout={{
                                width: 600,
                                height: 500,
                                margin: { l: 0, r: 0, b: 0, t: 0 },
                                scene: {
                                    xaxis: { title: xFeat },
                                    yaxis: { title: yFeat },
                                    zaxis: { title: zFeat }
                                }
                            }}
                        />
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

Scatter3DComp.propTypes = {
    fileData: PropTypes.array.isRequired,
    fields: PropTypes.array.isRequired,
};

export default Scatter3DComp;
