import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { PingController } from "./ping/ping.controller";
import { RefModule } from "@log/ref";
import { ClientsModule } from "@log/clients";
import { SupplyModule } from "@log/supply";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver } from "@nestjs/apollo";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { environment } from "../environments/environment";
import { ShippingModule } from "@log/shipping";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL') || environment.mongoUrl,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    RefModule,
    ClientsModule,
    SupplyModule,
    ShippingModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: true,
    }),
  ],
  controllers: [AppController, PingController],
  providers: [AppService],
})
export class AppModule {}
