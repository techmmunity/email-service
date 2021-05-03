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

import {
	TemplateFieldTypeEnum,
	TemplateFieldTypeValues,
} from "core/enums/template-field-type";

import { Limits } from "v1/config/limits";

import { DefaultOmitEntityFields } from "types/entity";

@Entity("template_fields")
export class TemplateFieldEntity extends BaseEntity {
	@PrimaryColumn({
		name: "template_id",
	})
	public templateId: string;

	@PrimaryColumn({
		length: Limits.templateField.field.max,
	})
	public field: string;

	@Column({
		nullable: false,
		enum: TemplateFieldTypeValues(),
	})
	public type: TemplateFieldTypeEnum;

	@Column({
		length: Limits.templateField.description.max,
		nullable: false,
	})
	public description: string;

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

	@ManyToOne(() => TemplateEntity, template => template.fields)
	@JoinColumn({
		name: "template_id",
	})
	public template: TemplateEntity;
}

export type TemplateFieldType = Omit<
	TemplateFieldEntity,
	DefaultOmitEntityFields | "template"
>;

export type TemplateFieldRepository = Repository<TemplateFieldEntity>;

export type TemplateFieldFindMany = FindManyOptions<TemplateFieldEntity>;

export type TemplateFieldFindOne = FindOneOptions<TemplateFieldEntity>;
