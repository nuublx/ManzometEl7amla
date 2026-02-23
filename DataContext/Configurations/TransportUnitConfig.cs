using DataContext.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataContext.Configurations
{
    public class TransportUnitConfig : IEntityTypeConfiguration<TransportUnit>
    {
        public void Configure(EntityTypeBuilder<TransportUnit> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).IsRequired().HasMaxLength(200);
        }
    }
}
