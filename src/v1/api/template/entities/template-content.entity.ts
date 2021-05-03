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

import { TemplateEntity } from "./template.entity";

import { LanguageEnum, LanguageValues } from "core/enums/language";

import { Limits } from "v1/config/limits";

import { DefaultOmitEntityFields } from "types/entity";

@Entity("template_contents")
export class TemplateContentEntity extends BaseEntity {
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

	@ManyToOne(() => TemplateEntity, template => template.contents)
	@JoinColumn({
		name: "template_id",
	})
	public template: TemplateEntity;
}

export type TemplateContentType = Omit<
	TemplateContentEntity,
	DefaultOmitEntityFields | "template"
>;

export type TemplateContentRepository = Repository<TemplateContentEntity>;

export type TemplateContentFindMany = FindManyOptions<TemplateContentEntity>;

export type TemplateContentFindOne = FindOneOptions<TemplateContentEntity>;
