using DataContext.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataContext.Configurations
{
    public class CampaignTypeConfig : IEntityTypeConfiguration<CampaignType>
    {
        public void Configure(EntityTypeBuilder<CampaignType> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).IsRequired().HasMaxLength(200);
        }
    }
}
