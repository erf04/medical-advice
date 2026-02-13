import { IsInt, IsOptional, Max, Min } from "class-validator";

export class CreateReviewDto {
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  comment?: string;
}
