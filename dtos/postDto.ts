import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, Min } from "class-validator";

export enum SortBy {
  ascending = 'ascending',
  descending = 'descending',
}

export class PostDto {
  @IsNotEmpty({ message: 'Title should not be empty' })
  @MaxLength(255)
  title!: string;

  @IsOptional()
  content!: string
}

export class GetParamsPostDto {
  @IsEnum(SortBy)
  @IsOptional()
  sortBy?: SortBy;

  @IsString()
  @IsOptional()
  search?: string;

  @IsNumber()
  @Min(0, { message: 'Limit must be a positive number (limit >= 0)' })
  @IsOptional()
  limit?: number;

  @IsNumber()
  @Min(0, { message: 'Offset must be a positive number (offset >= 0)' })
  @IsOptional()
  offset?: number;
}