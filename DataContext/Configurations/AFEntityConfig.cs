using DataContext.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataContext.Configurations
{
    public class AFEntityConfig : IEntityTypeConfiguration<AFEntity>
    {
        public void Configure(EntityTypeBuilder<AFEntity> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).IsRequired().HasMaxLength(200);
        }
    }
}
