import {
	BaseEntity,
	Column,
	Entity,
	CreateDateColumn,
	Repository,
	FindManyOptions,
	FindOneOptions,
	PrimaryColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from "typeorm";

import { TempalteEntity } from "./template.entity";

import { LanguageEnum, LanguageValues } from "core/enums/language";

import { Limits } from "v1/config/limits";

import { DefaultOmitEntityFields } from "types/entity";

@Entity("template_contents")
export class TempalteContentEntity extends BaseEntity {
	@PrimaryColumn({
		name: "template_id",
	})
	public templateId: string;

	@PrimaryColumn({
		enum: LanguageValues(),
	})
	public language: LanguageEnum;

	@Column({
		length: Limits.templateContent.content.max,
		nullable: false,
	})
	public content: string;

	@CreateDateColumn({
		name: "created_at",
		nullable: false,
	})
	public createdAt: Date;

	@UpdateDateColumn({
		name: "updated_at",
		nullable: false,
	})
	public updatedAt: Date;

	@ManyToOne(() => TempalteEntity, template => template.contents)
	@JoinColumn({
		name: "template_id",
	})
	public template: TempalteEntity;
}

export type TempalteContentType = Omit<
	TempalteContentEntity,
	DefaultOmitEntityFields | "template"
>;

export type TempalteContentRepository = Repository<TempalteContentEntity>;

export type TempalteContentFindMany = FindManyOptions<TempalteContentEntity>;

export type TempalteContentFindOne = FindOneOptions<TempalteContentEntity>;
