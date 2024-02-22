import CardsList from '@Components/CardsList';
import CreateCard from '@Components/CreateCard';
import CreateDontVisit from '@Components/CreateDontVisit';
import CreateDesignated from '@Components/CreateDesignated';
import CreateRecord from '@Components/CreateRecord';
import DontVisitList from '@Components/DontVisitList';
import DesignatedsList from '@Components/DesignatedsList';
import Header from '@Components/Header';
import React, { useCallback, useEffect } from 'react';
import RecordsList from '@Components/RecordsList';
import Selector from '@Components/Selector';
import TerritoryClosuresList from '@Components/TerritoryClosuresList';
import { AllData, useContextHook } from '@Context/index';
import { cardsService } from '@Services/cards';
import { CreateRecord as ICreateRecord } from '@Types/Records';
import { dontVisitService } from '@Services/dontVisit';
import { designatedService } from '@Services/designated';
import { ICreateCardData } from '@Types/Cards';
import { ICreateDontVisitData } from '@Types/DontVisit';
import { ICreateDesignated } from '@Types/Designated';
import { recordsService } from '@Services/records';
import { selectorOptions } from '@Constants/optionsSelector';
import { territoryClosureService } from '@Services/territoryClosure';
import { toast } from 'react-toastify';

interface IDashboard {}

// eslint-disable-next-line no-empty-pattern
const Dashboard: React.FC<IDashboard> = ({}) => {
  const {
    allData,
    setAllData,
    createNew,
    setCreateNew,
    selectedOption,
    setSelectedOption,
  } = useContextHook();

  const { cards, records, dontVisit, designateds, territoryClosures } = allData;

  const getBaseData = useCallback(async () => {
    const [cards, records, dontVisit, designateds, territoryClosures] =
      (await Promise.allSettled([
        cardsService.getCards(),
        recordsService.getRecords(),
        dontVisitService.getDontVisits(),
        designatedService.getDesignateds(),
        territoryClosureService.getTerritoryClosures(),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ])) as any;

    setAllData({
      cards: cards?.value,
      records: records?.value,
      dontVisit: dontVisit?.value,
      designateds: designateds?.value,
      territoryClosures: territoryClosures?.value,
    });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const genericSaveData = (fieldName: string, data: any[]) => {
    const dataToSave = {
      ...allData,
      [fieldName]: data,
    } as AllData;

    setAllData(dataToSave);
  };

  useEffect(() => {
    getBaseData();
  }, []);

  const handleDeleteCard = async (cardToBeDeletedId: string) => {
    await cardsService.deleteCard(cardToBeDeletedId || '');
    genericSaveData(
      'cards',
      cards?.filter((card) => card.id !== cardToBeDeletedId) || [],
    );
    getBaseData();
  };

  const handleDeleteDontVisit = async (dontVisitToBeDeletedId: string) => {
    await dontVisitService.deleteDontVisit(dontVisitToBeDeletedId || '');
    genericSaveData(
      'dontVisit',
      dontVisit?.filter(
        (dontVisit) => dontVisit.id !== dontVisitToBeDeletedId,
      ) || [],
    );
    getBaseData();
  };

  const handleCreateCard = async (createCardData: ICreateCardData) => {
    const newCard = await cardsService.createCard(createCardData);
    genericSaveData('cards', [...(cards || []), newCard]);
    getBaseData();
  };

  const handleCreateRecord = async (createRecordData: ICreateRecord) => {
    try {
      const newRecord = await recordsService.createRecord(createRecordData);
      genericSaveData('records', [...(records || []), newRecord]);
      toast.success('Registro criado com sucesso!');
      getBaseData();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
      throw new Error(error.message);
    }
  };

  const handleCreateDontVisit = async (
    createDontVisitData: ICreateDontVisitData,
  ) => {
    try {
      const newDontVisit = await dontVisitService.createDontVisit(
        createDontVisitData,
      );
      genericSaveData('dontVisit', [...(dontVisit || []), newDontVisit]);
      toast.success('Registro criado com sucesso!');
      getBaseData();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
      throw new Error(error.message);
    }
  };

  const handleCreateDesignated = async (
    createDesignatedData: ICreateDesignated,
  ) => {
    try {
      const newDesignated = await designatedService.createdFieldMananger(
        createDesignatedData,
      );
      genericSaveData('designateds', [...(designateds || []), newDesignated]);
      toast.success('Responsável criado com sucesso!');
      getBaseData();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error('Erro ao criar responsável');
    }
  };

  const handleDeleteDesignated = async (designatedId: string) => {
    try {
      await designatedService.deleteDesignated(designatedId);

      genericSaveData(
        'designateds',
        designateds?.filter((designated) => designated.id !== designatedId) ||
          [],
      );
      toast.success('Responsável deletado com sucesso!');
      getBaseData();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error('Erro ao deletar responsável');
    }
  };

  const handleCloseTerritory = async () => {
    try {
      await territoryClosureService.closeTerritory();
      toast.success('Território fechado com sucesso!');
      getBaseData();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error('Erro ao fechar território');
    }
  };

  const handleDeleteTerritoryClosure = async (territoryClosureId: string) => {
    try {
      await territoryClosureService.deleteTerritoryClosure(territoryClosureId);
      genericSaveData(
        'territoryClosures',
        territoryClosures?.filter(
          (territoryClosure) => territoryClosure.id !== territoryClosureId,
        ) || [],
      );
      toast.success('Fechamento de territorio deletado com sucesso!');
      getBaseData();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error('Erro ao deletar território');
    }
  };

  const handleEditCard = async (cardData: ICreateCardData) => {
    try {
      const newCard = await cardsService.updateCard(cardData);
      genericSaveData(
        'cards',
        cards?.map((card) => {
          if (card.id === newCard.id) {
            return newCard;
          }
          return card;
        }) || [],
      );
      toast.success('Cartão editado com sucesso!');
      getBaseData();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
      throw new Error(error.message);
    }
  };

  const handleEditRegister = async (recordData: ICreateRecord) => {
    try {
      const newCard = await recordsService.updateRecord(recordData);
      genericSaveData(
        'records',
        records?.map((record) => {
          if (record?.id === newCard.id) {
            return newCard;
          }
          return record;
        }) || [],
      );
      toast.success('Registro editado com sucesso!');
      getBaseData();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
      throw new Error(error.message);
    }
  };

  const handleEditDontVisit = async (dontVisitData: ICreateDontVisitData) => {
    try {
      const newDontVisit = await dontVisitService.updateDontVisit(
        dontVisitData,
      );
      genericSaveData(
        'dontVisit',
        dontVisit?.map((dontVisit) => {
          if (dontVisit.id === newDontVisit.id) {
            return newDontVisit;
          }
          return dontVisit;
        }) || [],
      );
      toast.success('Não visitar editado com sucesso!');
      getBaseData();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
      throw new Error(error.message);
    }
  };

  const handleEditDesignated = async (designatedData: ICreateDesignated) => {
    try {
      const newDesignated = await designatedService.updateDesignated(
        designatedData,
      );
      genericSaveData(
        'designateds',
        designateds?.map((designated) => {
          if (designated.id === newDesignated.id) {
            return newDesignated;
          }
          return designated;
        }) || [],
      );
      toast.success('Responsável editado com sucesso!');
      getBaseData();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
      throw new Error(error.message);
    }
  };

  return (
    <main className="w-screen min-h-screen flex flex-col justify-start items-center ">
      <Header />
      <Selector
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
      {selectedOption === selectorOptions.cards?.key && (
        <CardsList
          cards={cards}
          designateds={designateds}
          onCloseTerritory={handleCloseTerritory}
          handleDeleteCard={handleDeleteCard}
          onCreateRegister={handleCreateRecord}
          onEditCard={handleEditCard}
        />
      )}
      {selectedOption === selectorOptions.records.key && (
        <RecordsList records={records} onEditRegister={handleEditRegister} />
      )}
      {selectedOption === selectorOptions.designateds.key && (
        <DesignatedsList
          designateds={designateds}
          handleDeleteDesignated={handleDeleteDesignated}
          onEditDesignated={handleEditDesignated}
        />
      )}
      {selectedOption === selectorOptions.dontVisit.key && (
        <DontVisitList
          dontVisits={dontVisit}
          onDelete={handleDeleteDontVisit}
          onEdit={handleEditDontVisit}
        />
      )}
      {selectedOption === selectorOptions.territoryClosures.key && (
        <TerritoryClosuresList
          territoryClosures={territoryClosures}
          onDeleteTerritoryClosure={handleDeleteTerritoryClosure}
        />
      )}

      {createNew === selectorOptions.cards?.key && (
        <CreateCard
          isOpen={createNew !== ''}
          onClose={() => {
            setCreateNew('');
          }}
          onSave={handleCreateCard}
        />
      )}

      {createNew === selectorOptions.records.key && (
        <CreateRecord
          isOpen={createNew !== ''}
          onClose={() => {
            setCreateNew('');
          }}
          cards={cards || []}
          designated={designateds || []}
          onCreate={handleCreateRecord}
        />
      )}

      {createNew === selectorOptions.dontVisit.key && (
        <CreateDontVisit
          cards={cards || []}
          isOpen={createNew !== ''}
          onClose={() => {
            setCreateNew('');
          }}
          onCreate={handleCreateDontVisit}
        />
      )}

      {createNew === selectorOptions.designateds.key && (
        <CreateDesignated
          isOpen={createNew !== ''}
          onClose={() => {
            setCreateNew('');
          }}
          onSave={handleCreateDesignated}
        />
      )}
    </main>
  );
};

export default Dashboard;
