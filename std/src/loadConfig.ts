interface ConfigInterface {
    devWebServerPort: number,
    beServerAddress: string,
}

export const Config:ConfigInterface = {
    devWebServerPort: 5173,
    beServerAddress: "http://localhost:3000",
}