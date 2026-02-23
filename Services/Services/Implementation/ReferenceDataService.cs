using DataContext.Context;
using DataContext.Entities;
using Microsoft.EntityFrameworkCore;
using Services.DTO;
using Services.Services.Interface;

namespace Services.Services.Implementation
{
    public class ReferenceDataService(DatabaseContext context) : IReferenceDataService
    {
        public Task<IEnumerable<NamedEntityDto>> GetAFEntitiesAsync(CancellationToken token) =>
            GetNamedEntitiesAsync(context.AFEntities, token);

        public Task<NamedEntityDto> GetAFEntityByIdAsync(int id, CancellationToken token) =>
            GetNamedEntityByIdAsync(context.AFEntities, id, token, "AFEntity");

        public Task<NamedEntityDto> CreateAFEntityAsync(CreateNamedEntityDto dto, CancellationToken token) =>
            CreateNamedEntityAsync(context.AFEntities, dto.Name, token);

        public Task<NamedEntityDto> UpdateAFEntityAsync(int id, UpdateNamedEntityDto dto, CancellationToken token) =>
            UpdateNamedEntityAsync(context.AFEntities, id, dto.Name, token, "AFEntity");

        public Task DeleteAFEntityAsync(int id, CancellationToken token) =>
            DeleteNamedEntityAsync(context.AFEntities, id, token, "AFEntity");

        public Task<IEnumerable<NamedEntityDto>> GetBeneficiariesAsync(CancellationToken token) =>
            GetNamedEntitiesAsync(context.Beneficiaries, token);

        public Task<NamedEntityDto> GetBeneficiaryByIdAsync(int id, CancellationToken token) =>
            GetNamedEntityByIdAsync(context.Beneficiaries, id, token, "Beneficiary");

        public Task<NamedEntityDto> CreateBeneficiaryAsync(CreateNamedEntityDto dto, CancellationToken token) =>
            CreateNamedEntityAsync(context.Beneficiaries, dto.Name, token);

        public Task<NamedEntityDto> UpdateBeneficiaryAsync(int id, UpdateNamedEntityDto dto, CancellationToken token) =>
            UpdateNamedEntityAsync(context.Beneficiaries, id, dto.Name, token, "Beneficiary");

        public Task DeleteBeneficiaryAsync(int id, CancellationToken token) =>
            DeleteNamedEntityAsync(context.Beneficiaries, id, token, "Beneficiary");

        public async Task<IEnumerable<CampaignThingDto>> GetCampaignThingsAsync(CancellationToken token)
        {
            return await context.CampaignThings
                .Select(x => new CampaignThingDto { Id = x.Id, Name = x.Name, CampaignId = x.CampaignId })
                .ToListAsync(token);
        }

        public async Task<CampaignThingDto> GetCampaignThingByIdAsync(int id, CancellationToken token)
        {
            ValidateId(id);
            return await context.CampaignThings
                .Where(x => x.Id == id)
                .Select(x => new CampaignThingDto { Id = x.Id, Name = x.Name, CampaignId = x.CampaignId })
                .FirstOrDefaultAsync(token) ?? throw new KeyNotFoundException($"CampaignThing with id {id} not found");
        }

        public async Task<CampaignThingDto> CreateCampaignThingAsync(CreateCampaignThingDto dto, CancellationToken token)
        {
            var entity = new CampaignThing { Name = dto.Name, CampaignId = dto.CampaignId };
            context.CampaignThings.Add(entity);
            await context.SaveChangesAsync(token);
            return new CampaignThingDto { Id = entity.Id, Name = entity.Name, CampaignId = entity.CampaignId };
        }

        public async Task<CampaignThingDto> UpdateCampaignThingAsync(int id, UpdateCampaignThingDto dto, CancellationToken token)
        {
            ValidateId(id);
            var entity = await context.CampaignThings.FirstOrDefaultAsync(x => x.Id == id, token)
                ?? throw new KeyNotFoundException($"CampaignThing with id {id} not found");

            entity.Name = dto.Name;
            entity.CampaignId = dto.CampaignId;
            await context.SaveChangesAsync(token);

            return new CampaignThingDto { Id = entity.Id, Name = entity.Name, CampaignId = entity.CampaignId };
        }

        public async Task DeleteCampaignThingAsync(int id, CancellationToken token)
        {
            ValidateId(id);
            var entity = await context.CampaignThings.FirstOrDefaultAsync(x => x.Id == id, token)
                ?? throw new KeyNotFoundException($"CampaignThing with id {id} not found");
            context.CampaignThings.Remove(entity);
            await context.SaveChangesAsync(token);
        }

        public Task<IEnumerable<NamedEntityDto>> GetCampaignTypesAsync(CancellationToken token) =>
            GetNamedEntitiesAsync(context.CampaignTypes, token);

        public Task<NamedEntityDto> GetCampaignTypeByIdAsync(int id, CancellationToken token) =>
            GetNamedEntityByIdAsync(context.CampaignTypes, id, token, "CampaignType");

        public Task<NamedEntityDto> CreateCampaignTypeAsync(CreateNamedEntityDto dto, CancellationToken token) =>
            CreateNamedEntityAsync(context.CampaignTypes, dto.Name, token);

        public Task<NamedEntityDto> UpdateCampaignTypeAsync(int id, UpdateNamedEntityDto dto, CancellationToken token) =>
            UpdateNamedEntityAsync(context.CampaignTypes, id, dto.Name, token, "CampaignType");

        public Task DeleteCampaignTypeAsync(int id, CancellationToken token) =>
            DeleteNamedEntityAsync(context.CampaignTypes, id, token, "CampaignType");

        public Task<IEnumerable<NamedEntityDto>> GetCargoTypesAsync(CancellationToken token) =>
            GetNamedEntitiesAsync(context.CargoTypes, token);

        public Task<NamedEntityDto> GetCargoTypeByIdAsync(int id, CancellationToken token) =>
            GetNamedEntityByIdAsync(context.CargoTypes, id, token, "CargoType");

        public Task<NamedEntityDto> CreateCargoTypeAsync(CreateNamedEntityDto dto, CancellationToken token) =>
            CreateNamedEntityAsync(context.CargoTypes, dto.Name, token);

        public Task<NamedEntityDto> UpdateCargoTypeAsync(int id, UpdateNamedEntityDto dto, CancellationToken token) =>
            UpdateNamedEntityAsync(context.CargoTypes, id, dto.Name, token, "CargoType");

        public Task DeleteCargoTypeAsync(int id, CancellationToken token) =>
            DeleteNamedEntityAsync(context.CargoTypes, id, token, "CargoType");

        public Task<IEnumerable<NamedEntityDto>> GetMissionsAsync(CancellationToken token) =>
            GetNamedEntitiesAsync(context.Missions, token);

        public Task<NamedEntityDto> GetMissionByIdAsync(int id, CancellationToken token) =>
            GetNamedEntityByIdAsync(context.Missions, id, token, "Mission");

        public Task<NamedEntityDto> CreateMissionAsync(CreateNamedEntityDto dto, CancellationToken token) =>
            CreateNamedEntityAsync(context.Missions, dto.Name, token);

        public Task<NamedEntityDto> UpdateMissionAsync(int id, UpdateNamedEntityDto dto, CancellationToken token) =>
            UpdateNamedEntityAsync(context.Missions, id, dto.Name, token, "Mission");

        public Task DeleteMissionAsync(int id, CancellationToken token) =>
            DeleteNamedEntityAsync(context.Missions, id, token, "Mission");

        public Task<IEnumerable<NamedEntityDto>> GetTransportUnitsAsync(CancellationToken token) =>
            GetNamedEntitiesAsync(context.TransportUnits, token);

        public Task<NamedEntityDto> GetTransportUnitByIdAsync(int id, CancellationToken token) =>
            GetNamedEntityByIdAsync(context.TransportUnits, id, token, "TransportUnit");

        public Task<NamedEntityDto> CreateTransportUnitAsync(CreateNamedEntityDto dto, CancellationToken token) =>
            CreateNamedEntityAsync(context.TransportUnits, dto.Name, token);

        public Task<NamedEntityDto> UpdateTransportUnitAsync(int id, UpdateNamedEntityDto dto, CancellationToken token) =>
            UpdateNamedEntityAsync(context.TransportUnits, id, dto.Name, token, "TransportUnit");

        public Task DeleteTransportUnitAsync(int id, CancellationToken token) =>
            DeleteNamedEntityAsync(context.TransportUnits, id, token, "TransportUnit");

        public async Task<IEnumerable<VehicleDto>> GetVehiclesAsync(CancellationToken token)
        {
            return await context.Vehicles
                .Select(x => new VehicleDto { Id = x.Id, Name = x.Name, Type = x.Type })
                .ToListAsync(token);
        }

        public async Task<VehicleDto> GetVehicleByIdAsync(int id, CancellationToken token)
        {
            ValidateId(id);
            return await context.Vehicles
                .Where(x => x.Id == id)
                .Select(x => new VehicleDto { Id = x.Id, Name = x.Name, Type = x.Type })
                .FirstOrDefaultAsync(token) ?? throw new KeyNotFoundException($"Vehicle with id {id} not found");
        }

        public async Task<VehicleDto> CreateVehicleAsync(CreateVehicleDto dto, CancellationToken token)
        {
            var entity = new Vehicle { Name = dto.Name, Type = dto.Type };
            context.Vehicles.Add(entity);
            await context.SaveChangesAsync(token);
            return new VehicleDto { Id = entity.Id, Name = entity.Name, Type = entity.Type };
        }

        public async Task<VehicleDto> UpdateVehicleAsync(int id, UpdateVehicleDto dto, CancellationToken token)
        {
            ValidateId(id);
            var entity = await context.Vehicles.FirstOrDefaultAsync(x => x.Id == id, token)
                ?? throw new KeyNotFoundException($"Vehicle with id {id} not found");
            entity.Name = dto.Name;
            entity.Type = dto.Type;
            await context.SaveChangesAsync(token);
            return new VehicleDto { Id = entity.Id, Name = entity.Name, Type = entity.Type };
        }

        public async Task DeleteVehicleAsync(int id, CancellationToken token)
        {
            ValidateId(id);
            var entity = await context.Vehicles.FirstOrDefaultAsync(x => x.Id == id, token)
                ?? throw new KeyNotFoundException($"Vehicle with id {id} not found");
            context.Vehicles.Remove(entity);
            await context.SaveChangesAsync(token);
        }

        private static void ValidateId(int id)
        {
            if (id < 0)
            {
                throw new ArgumentException("Id must be non-negative", nameof(id));
            }
        }

        private async Task<IEnumerable<NamedEntityDto>> GetNamedEntitiesAsync<T>(DbSet<T> set, CancellationToken token)
            where T : class
        {
            return await set
                .Select(x => new NamedEntityDto
                {
                    Id = EF.Property<int>(x, "Id"),
                    Name = EF.Property<string>(x, "Name")
                })
                .ToListAsync(token);
        }

        private async Task<NamedEntityDto> GetNamedEntityByIdAsync<T>(DbSet<T> set, int id, CancellationToken token, string entityName)
            where T : class
        {
            ValidateId(id);
            return await set
                .Where(x => EF.Property<int>(x, "Id") == id)
                .Select(x => new NamedEntityDto
                {
                    Id = EF.Property<int>(x, "Id"),
                    Name = EF.Property<string>(x, "Name")
                })
                .FirstOrDefaultAsync(token) ?? throw new KeyNotFoundException($"{entityName} with id {id} not found");
        }

        private async Task<NamedEntityDto> CreateNamedEntityAsync<T>(DbSet<T> set, string name, CancellationToken token)
            where T : class, new()
        {
            var entity = new T();
            set.Add(entity);
            context.Entry(entity).Property("Name").CurrentValue = name;
            await context.SaveChangesAsync(token);
            return new NamedEntityDto
            {
                Id = context.Entry(entity).Property<int>("Id").CurrentValue,
                Name = context.Entry(entity).Property<string>("Name").CurrentValue ?? string.Empty
            };
        }

        private async Task<NamedEntityDto> UpdateNamedEntityAsync<T>(DbSet<T> set, int id, string name, CancellationToken token, string entityName)
            where T : class
        {
            ValidateId(id);
            var entity = await set.FirstOrDefaultAsync(x => EF.Property<int>(x, "Id") == id, token)
                ?? throw new KeyNotFoundException($"{entityName} with id {id} not found");

            context.Entry(entity).Property("Name").CurrentValue = name;
            await context.SaveChangesAsync(token);
            return new NamedEntityDto
            {
                Id = context.Entry(entity).Property<int>("Id").CurrentValue,
                Name = context.Entry(entity).Property<string>("Name").CurrentValue ?? string.Empty
            };
        }

        private async Task DeleteNamedEntityAsync<T>(DbSet<T> set, int id, CancellationToken token, string entityName)
            where T : class
        {
            ValidateId(id);
            var entity = await set.FirstOrDefaultAsync(x => EF.Property<int>(x, "Id") == id, token)
                ?? throw new KeyNotFoundException($"{entityName} with id {id} not found");
            set.Remove(entity);
            await context.SaveChangesAsync(token);
        }
    }
}
