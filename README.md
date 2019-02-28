![Kafka Lens Logo](kl-f-logo.png)
Kafka Lens aims to give developers a tool to easily inspect a Kafka cluster in real-time to enable easier troubleshooting of cluster problems. Now you can easily test whether new services are functioning correctly by monitoring the messages as they are sent to your cluster without the need to inspect the cluster through the CLI.

![Screen Capture](kl-g.gif)

## 5 Steps for a Quick Startup

**Fork** and **Clone** Repository
```
1. cd into your 'kafka-lens' folder
2. npm install
3. npm run webpack
4. run this script in your command line: './node_modules/.bin/electron-rebuild'
5. npm start
```

### Connecting to Your Broker

Enter the URI of your Kafka broker (e.g. kafka1.contoso.com:9092) then click 'Connect' to connect to your Kafka broker. Once you are connected, you are ready to start consuming messages in real-time. 

![](cp-rm.gif)

## Authors
[Harmon Huynh](https://github.com/iAmHarmon)

[Howard Na](https://github.com/howardNa)

[Jordan Betzer](https://github.com/jordanzobean)
