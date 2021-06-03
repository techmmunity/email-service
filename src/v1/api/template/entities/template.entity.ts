import {
	BaseEntity,
	Column,
	Entity,
	CreateDateColumn,
	Repository,
	FindManyOptions,
	FindOneOptions,
	PrimaryColumn,
	Index,
	UpdateDateColumn,
	Unique,
	OneToMany,
} from "typeorm";

import { TemplateContentEntity } from "./template-content.entity";
import { TemplateFieldEntity } from "./template-field.entity";

import { ApplicationEnum, ApplicationValues } from "core/enums/applications";

import { LIMITS } from "v1/config/limits";

import { DefaultOmitEntityFields } from "types/entity";

@Entity("templates")
@Unique(["application", "code"])
export class TemplateEntity extends BaseEntity {
	@PrimaryColumn({
		length: LIMITS.ids.uuid.length,
	})
	public id: string;

	@Column({
		nullable: false,
		enum: ApplicationValues(),
	})
	public application: ApplicationEnum;

	@Index()
	@Column({
		length: LIMITS.template.code.max,
		nullable: false,
	})
	public code: string;

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

	@OneToMany(
		() => TemplateFieldEntity,
		templateField => templateField.template,
		{
			cascade: true,
		},
	)
	public fields: Array<TemplateFieldEntity>;

	@OneToMany(
		() => TemplateContentEntity,
		templateContent => templateContent.template,
		{
			cascade: true,
		},
	)
	public contents: Array<TemplateContentEntity>;
}

export type TemplateType = Omit<
	TemplateEntity,
	DefaultOmitEntityFields | "contents" | "fields"
>;

export type TemplateRepository = Repository<TemplateEntity>;

export type TemplateFindMany = FindManyOptions<TemplateEntity>;

export type TemplateFindOne = FindOneOptions<TemplateEntity>;
