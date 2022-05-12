import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePermissionsRoles1631496324214 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "permissions_roles",
                columns: [
                    {
                        name: "permission_id",
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
            "permissions_roles",
            new TableForeignKey({
                columnNames: ["permission_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "permissions",
                name: "fk_permissions_roles",
                onDelete: "CASCADE"
            })
        );

        await queryRunner.createForeignKey(
            "permissions_roles",
            new TableForeignKey({
                columnNames: ["role_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "roles",
                name: "fk_roles_permissions",
                onDelete: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("permissions_roles", "fk_permissions_roles");
        await queryRunner.dropForeignKey("permissions_roles", "fk_roles_permissions");
        await queryRunner.dropTable("permissions_roles");
    }
}
