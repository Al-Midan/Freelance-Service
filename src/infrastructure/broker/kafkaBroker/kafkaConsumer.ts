import { KafkaModule } from "../../../utils/kafka/kafkaModule";
import { KafkaMessage } from "kafkajs";

class KafkaConsumer extends KafkaModule {
  private responseHandlers: Map<string, (courses: any) => void> = new Map();

  constructor() {
    // super('freelance-service-consumer', ['localhost:9092']);
    super("user-service-producer", ["kafka:9092"]);
  }

  async init() {
    await this.connect();
    await this.subscribeToTopic("userDetails-response");
    this.startConsuming();
  }

  private async startConsuming() {
    await this.runConsumer(async (message: KafkaMessage) => {
      console.log("Received Kafka message:", message.value?.toString());
      const messageData = JSON.parse(message.value!.toString());
      console.log("Parsed message data:", messageData);
      const handler = this.responseHandlers.get(messageData.userId);
      if (handler) {
        handler(messageData.userDetails);
        this.responseHandlers.delete(messageData.userId);
      } else {
        console.log("No handler found for userId:", messageData.userId);
      }
    });
  }

  waitForUserDetailsResponse(userId: string): Promise<any> {
    return new Promise((resolve) => {
      this.responseHandlers.set(userId, resolve);
    });
  }
}

export const kafkaConsumer = new KafkaConsumer();
