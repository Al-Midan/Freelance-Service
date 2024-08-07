import { KafkaModule } from "../../../utils/kafka/kafkaModule";

class KafkaProducer extends KafkaModule {
  constructor() {
    //super('freelance-service-producer', ['localhost:9092']);
    super("user-service-producer", ["kafka:29092"]);
  }

  async sendUserDetailsRequest(userId: string): Promise<void> {
    await this.connect();
    await this.sendMessage("userDetails-request", userId, { userId });
  }
}

export const kafkaProducer = new KafkaProducer();
