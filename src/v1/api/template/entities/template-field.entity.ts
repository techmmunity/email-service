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

import {
	TemplateFieldTypeEnum,
	TemplateFieldTypeValues,
} from "core/enums/template-field-type";

import { Limits } from "v1/config/limits";

import { DefaultOmitEntityFields } from "types/entity";

@Entity("template_fields")
export class TempalteFieldEntity extends BaseEntity {
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

	@ManyToOne(() => TempalteEntity, template => template.fields)
	@JoinColumn({
		name: "template_id",
	})
	public template: TempalteEntity;
}

export type TempalteFieldType = Omit<
	TempalteFieldEntity,
	DefaultOmitEntityFields
>;

export type TempalteFieldRepository = Repository<TempalteFieldEntity>;

export type TempalteFieldFindMany = FindManyOptions<TempalteFieldEntity>;

export type TempalteFieldFindOne = FindOneOptions<TempalteFieldEntity>;
