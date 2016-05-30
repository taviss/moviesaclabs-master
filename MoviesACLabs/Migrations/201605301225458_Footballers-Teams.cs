namespace MoviesACLabs.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FootballersTeams : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Footballer", "Team_Id", c => c.Int());
            CreateIndex("dbo.Footballer", "Team_Id");
            AddForeignKey("dbo.Footballer", "Team_Id", "dbo.Team", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Footballer", "Team_Id", "dbo.Team");
            DropIndex("dbo.Footballer", new[] { "Team_Id" });
            DropColumn("dbo.Footballer", "Team_Id");
        }
    }
}
