import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

// temp-file.entity.ts
@Entity()
export class TempFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column()
  filePath: string;

  @Column()
  fileName: string;

  @Column()
  fileSize: number;

  @Column()
  fileMimeType: string;

  @Column()
  uploadedBy: number;

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
