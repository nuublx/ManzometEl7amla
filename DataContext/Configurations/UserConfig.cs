namespace DataContext.Configurations
{
    using DataContext.Entities;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    public class UserConfig : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name)
                   .IsRequired()
                   .HasMaxLength(100);

            builder.Property(x => x.PasswordHash)
                   .IsRequired()
                   .HasMaxLength(256);

            builder.HasIndex(x => x.Id);
            builder.HasIndex(x => x.Name)
                   .IsUnique();
        }
    }
}
