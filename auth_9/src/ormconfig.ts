import { Comment } from './entities/comment.entity';
import { Topic } from './entities/topic.entity';
import { User } from './entities/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'mydb',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  entities: [User, Topic, Comment],
  synchronize: true,
};

export default config;
