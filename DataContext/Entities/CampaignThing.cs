namespace DataContext.Entities
{
    public class CampaignThing
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int CampaignId { get; set; }
    }
}
