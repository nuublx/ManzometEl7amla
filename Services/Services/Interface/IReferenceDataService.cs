using Services.DTO;

namespace Services.Services.Interface
{
    public interface IReferenceDataService
    {
        Task<IEnumerable<NamedEntityDto>> GetAFEntitiesAsync(CancellationToken token);
        Task<NamedEntityDto> GetAFEntityByIdAsync(int id, CancellationToken token);
        Task<NamedEntityDto> CreateAFEntityAsync(CreateNamedEntityDto dto, CancellationToken token);
        Task<NamedEntityDto> UpdateAFEntityAsync(int id, UpdateNamedEntityDto dto, CancellationToken token);
        Task DeleteAFEntityAsync(int id, CancellationToken token);

        Task<IEnumerable<NamedEntityDto>> GetBeneficiariesAsync(CancellationToken token);
        Task<NamedEntityDto> GetBeneficiaryByIdAsync(int id, CancellationToken token);
        Task<NamedEntityDto> CreateBeneficiaryAsync(CreateNamedEntityDto dto, CancellationToken token);
        Task<NamedEntityDto> UpdateBeneficiaryAsync(int id, UpdateNamedEntityDto dto, CancellationToken token);
        Task DeleteBeneficiaryAsync(int id, CancellationToken token);

        Task<IEnumerable<CampaignThingDto>> GetCampaignThingsAsync(CancellationToken token);
        Task<CampaignThingDto> GetCampaignThingByIdAsync(int id, CancellationToken token);
        Task<CampaignThingDto> CreateCampaignThingAsync(CreateCampaignThingDto dto, CancellationToken token);
        Task<CampaignThingDto> UpdateCampaignThingAsync(int id, UpdateCampaignThingDto dto, CancellationToken token);
        Task DeleteCampaignThingAsync(int id, CancellationToken token);

        Task<IEnumerable<NamedEntityDto>> GetCampaignTypesAsync(CancellationToken token);
        Task<NamedEntityDto> GetCampaignTypeByIdAsync(int id, CancellationToken token);
        Task<NamedEntityDto> CreateCampaignTypeAsync(CreateNamedEntityDto dto, CancellationToken token);
        Task<NamedEntityDto> UpdateCampaignTypeAsync(int id, UpdateNamedEntityDto dto, CancellationToken token);
        Task DeleteCampaignTypeAsync(int id, CancellationToken token);

        Task<IEnumerable<NamedEntityDto>> GetCargoTypesAsync(CancellationToken token);
        Task<NamedEntityDto> GetCargoTypeByIdAsync(int id, CancellationToken token);
        Task<NamedEntityDto> CreateCargoTypeAsync(CreateNamedEntityDto dto, CancellationToken token);
        Task<NamedEntityDto> UpdateCargoTypeAsync(int id, UpdateNamedEntityDto dto, CancellationToken token);
        Task DeleteCargoTypeAsync(int id, CancellationToken token);

        Task<IEnumerable<NamedEntityDto>> GetMissionsAsync(CancellationToken token);
        Task<NamedEntityDto> GetMissionByIdAsync(int id, CancellationToken token);
        Task<NamedEntityDto> CreateMissionAsync(CreateNamedEntityDto dto, CancellationToken token);
        Task<NamedEntityDto> UpdateMissionAsync(int id, UpdateNamedEntityDto dto, CancellationToken token);
        Task DeleteMissionAsync(int id, CancellationToken token);

        Task<IEnumerable<NamedEntityDto>> GetTransportUnitsAsync(CancellationToken token);
        Task<NamedEntityDto> GetTransportUnitByIdAsync(int id, CancellationToken token);
        Task<NamedEntityDto> CreateTransportUnitAsync(CreateNamedEntityDto dto, CancellationToken token);
        Task<NamedEntityDto> UpdateTransportUnitAsync(int id, UpdateNamedEntityDto dto, CancellationToken token);
        Task DeleteTransportUnitAsync(int id, CancellationToken token);

        Task<IEnumerable<VehicleDto>> GetVehiclesAsync(CancellationToken token);
        Task<VehicleDto> GetVehicleByIdAsync(int id, CancellationToken token);
        Task<VehicleDto> CreateVehicleAsync(CreateVehicleDto dto, CancellationToken token);
        Task<VehicleDto> UpdateVehicleAsync(int id, UpdateVehicleDto dto, CancellationToken token);
        Task DeleteVehicleAsync(int id, CancellationToken token);
    }
}
