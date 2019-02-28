![alt-text](kl-f-logo.png)

# A visualization tool for your Kafka cluster

Kafka Lens provides a tool that lets you inspect a Kafka cluster in real-time, empowering you to troubleshoot issues in the cluster as they occur. Now you can easily test whether new services are functioning correctly by monitoring how messages are published to topics and paritions in your data pipeline without the need of a CLI or other costly solutions.

![](kl-g.gif)

## 5 Steps for a quick start up

Follow these quick steps to launch the application.

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
