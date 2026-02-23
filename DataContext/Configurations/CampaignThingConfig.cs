using DataContext.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DataContext.Configurations
{
    public class CampaignThingConfig : IEntityTypeConfiguration<CampaignThing>
    {
        public void Configure(EntityTypeBuilder<CampaignThing> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Name).IsRequired().HasMaxLength(200);

            builder.HasOne<CampaignType>()
                .WithMany()
                .HasForeignKey(x => x.CampaignId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
