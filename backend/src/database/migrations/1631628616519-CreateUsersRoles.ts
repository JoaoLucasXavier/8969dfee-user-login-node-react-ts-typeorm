import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUsersRoles1631628616519 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users_roles",
                columns: [
                    {
                        name: "user_id",
                        type: "varchar",
                        isNullable: false,
                        generationStrategy: "uuid",
                    },
                    {
                        name: "role_id",
                        type: "varchar",
                        isNullable: false,
                        generationStrategy: "uuid",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    }
                ],
            })
        );

        await queryRunner.createForeignKey(
            "users_roles",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                name: "fk_users_roles",
                onDelete: "CASCADE"
            })
        );

        await queryRunner.createForeignKey(
            "users_roles",
            new TableForeignKey({
                columnNames: ["role_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "roles",
                name: "fk_roles_users",
                onDelete: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("users_roles", "fk_users_roles");
        await queryRunner.dropForeignKey("users_roles", "fk_roles_users");
        await queryRunner.dropTable("users_roles");
    }
}
