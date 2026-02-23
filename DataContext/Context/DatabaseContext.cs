namespace DataContext.Context
{
    using DataContext.Entities;
    using Microsoft.EntityFrameworkCore;

    public class DatabaseContext(DbContextOptions<DatabaseContext> options) : DbContext(options)
    {
        public DbSet<AFEntity> AFEntities => Set<AFEntity>();
        public DbSet<Beneficiary> Beneficiaries => Set<Beneficiary>();
        public DbSet<CampaignThing> CampaignThings => Set<CampaignThing>();
        public DbSet<CampaignType> CampaignTypes => Set<CampaignType>();
        public DbSet<CargoType> CargoTypes => Set<CargoType>();
        public DbSet<Mission> Missions => Set<Mission>();
        public DbSet<TransportUnit> TransportUnits => Set<TransportUnit>();
        public DbSet<User> Users => Set<User>();
        public DbSet<Vehicle> Vehicles => Set<Vehicle>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(DatabaseContext).Assembly);
            base.OnModelCreating(modelBuilder);
        }
    }
}
