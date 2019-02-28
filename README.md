# Kafka Lens
Kafka Lens aims to give developers a tool to easily inspect a Kafka cluster in real-time to enable easier troubleshooting of cluster problems. Now you can easily test whether new services are functioning correctly by monitoring the messages they send to your cluster without the need to inspect the cluster through the CLI.

![alt text](kl-g.gif "Screen Capture")

## Download

|![macOS](https://img.icons8.com/ios/2x/mac-os-filled.png "https://google.com")|![Windows](https://www.freeiconspng.com/minicovers/system-windows-icon-png-4.png "https://google.com")|![linux](https://www.freeiconspng.com/minicovers/linux-icon-4.png "Linux")|
|:---:|:---:|:---:|
|macOS|Windows|Linux|

## Building Your Own Version

Follow these quick steps to launch the application.

```
1. npm install
2. npm run webpack
3. __cd__ into your 'kafka-lens' folder
4. __run__ this script in your command line: __'./node_modules/.bin/electron-rebuild'__
5. npm start
```

### Connecting to Your Broker

Enter the URI of your Kafka broker (e.g. kafka1.contoso.com:9092) then click 'Connect' to connect to your Kafka broker. Once you connect, you are ready to start consuming messages in real-time. 

![](cp-rm.gif)

## Authors
[Harmon Huynh](https://github.com/iAmHarmon)

[Howard Na](https://github.com/howardNa)

[Jordan Betzer](https://github.com/jordanzobean)

