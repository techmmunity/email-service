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

import { TempalteFieldEntity } from "./template-field.entity";

import { ApplicationEnum, ApplicationValues } from "core/enums/applications";

import { Limits } from "v1/config/limits";

import { DefaultOmitEntityFields } from "types/entity";

@Entity("templates")
@Unique(["application", "code"])
export class TempalteEntity extends BaseEntity {
	@PrimaryColumn({
		length: Limits.ids.uuid.length,
	})
	public id: string;

	@Column({
		nullable: false,
		enum: ApplicationValues(),
	})
	public application: ApplicationEnum;

	@Index()
	@Column({
		length: Limits.template.code.max,
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

	@OneToMany(() => TempalteFieldEntity, templateField => templateField.template)
	public fields: Array<TempalteFieldEntity>;
}

export type TempalteType = Omit<TempalteEntity, DefaultOmitEntityFields>;

export type TempalteRepository = Repository<TempalteEntity>;

export type TempalteFindMany = FindManyOptions<TempalteEntity>;

export type TempalteFindOne = FindOneOptions<TempalteEntity>;
