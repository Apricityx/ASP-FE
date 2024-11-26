interface ConfigInterface {
    devWebServerPort: number,
    beServerAddress: string,
    title: string
}

export const Config:ConfigInterface = {
    devWebServerPort: 5173,
    beServerAddress: "http://localhost:3000",
    title: "软工中外34班作业提交入口"
}